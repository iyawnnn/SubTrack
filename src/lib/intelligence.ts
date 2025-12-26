import dayjs from "dayjs";
import { convertTo } from "@/lib/currency-helper";

type SubStatus = "ACTIVE" | "PAUSED" | "CANCELLED";

interface Subscription {
  id: string;
  vendor: { name: string };
  cost: number;
  currency: string;
  category: string;
  status: SubStatus | string; // Handle Prisma enum strings
  frequency: "MONTHLY" | "YEARLY" | string;
  nextRenewalDate: Date;
}

// 👇 LIST OF CATEGORIES TO IGNORE FOR REDUNDANCY CHECKS
const SAFE_CATEGORIES = [
  "Personal",
  "Work",
  "Uncategorized",
  "General",
  "Utilities",
];

/**
 * 1. Redundancy Insights
 * Groups active subscriptions by category.
 * Returns categories that have more than 1 active subscription,
 * EXCLUDING generic buckets like "Personal".
 */
export function getRedundancyInsights(subs: Subscription[]) {
  const activeSubs = subs.filter((s) => s.status === "ACTIVE");
  const groups: Record<string, Subscription[]> = {};

  activeSubs.forEach((sub) => {
    if (!groups[sub.category]) groups[sub.category] = [];
    groups[sub.category].push(sub);
  });

  // Filter for categories with > 1 subscription
  return Object.entries(groups)
    .filter(([category, items]) => {
      // Rule 1: Must have more than 1 subscription
      if (items.length <= 1) return false;

      // Rule 2: Must NOT be a safe/generic category
      if (SAFE_CATEGORIES.includes(category)) return false;

      return true;
    })
    .map(([category, items]) => ({
      category,
      count: items.length,
      vendors: items.map((i) => i.vendor.name),
      totalCost: items.reduce((sum, i) => sum + i.cost, 0),
    }));
}

/**
 * 2. Graveyard Stats (Money Saved)
 * Sums the cost of all CANCELLED subscriptions.
 * Normalizes to the User's Base Currency.
 */
export function getGraveyardStats(
  subs: Subscription[],
  rates: Record<string, number>,
  baseCurrency: string
) {
  const cancelled = subs.filter((s) => s.status === "CANCELLED");

  const totalSavedMonthly = cancelled.reduce((acc, sub) => {
    // 1. Normalize cost to Base Currency
    const costInBase = convertTo(sub.cost, sub.currency, baseCurrency, rates);

    // 2. Normalize frequency to Monthly (to show "Monthly Savings")
    const monthlyCost =
      sub.frequency === "YEARLY" ? costInBase / 12 : costInBase;

    return acc + monthlyCost;
  }, 0);

  return {
    count: cancelled.length,
    totalSavedMonthly,
    cancelledSubs: cancelled,
  };
}

/**
 * 3. Cash Flow Runway (30/60/90 Days)
 * Projects spending based on renewal dates.
 * Handles recurring logic (e.g. a monthly sub appears 3 times in 90 days).
 */
export function getCashFlowRunway(
  subs: Subscription[],
  rates: Record<string, number>,
  baseCurrency: string
) {
  const active = subs.filter((s) => s.status === "ACTIVE");
  const now = dayjs();

  let d30 = 0;
  let d60 = 0;
  let d90 = 0;

  active.forEach((sub) => {
    let renewal = dayjs(sub.nextRenewalDate);
    // Normalize cost to base currency once
    const cost = convertTo(sub.cost, sub.currency, baseCurrency, rates);

    // Look ahead 90 days
    // We loop to catch multiple renewals (e.g. 3 monthly payments in 90 days)
    for (let i = 0; i < 12; i++) {
      // Safety break
      const diff = renewal.diff(now, "day");

      if (diff > 90) break; // Beyond our window

      if (diff >= 0) {
        if (diff <= 30) d30 += cost;
        if (diff <= 60) d60 += cost;
        if (diff <= 90) d90 += cost;
      }

      // Advance to next period
      if (sub.frequency === "MONTHLY") {
        renewal = renewal.add(1, "month");
      } else if (sub.frequency === "YEARLY") {
        renewal = renewal.add(1, "year");
      } else {
        break; // Unknown frequency
      }
    }
  });

  return { d30, d60, d90 };
}
