import { Decimal } from "@prisma/client/runtime/library";

/**
 * Helper to convert any amount from one currency to another using the rates object.
 * Logic: (Amount / FromRate) * ToRate
 * Assumes rates are based on USD (1 USD = X Currency).
 */
export function convertTo(
  amount: number | Decimal,
  fromCurrency: string,
  toCurrency: string,
  rates: Record<string, number>
): number {
  const val = Number(amount);
  if (fromCurrency === toCurrency) return val;

  // If rates are missing, default to 1:1 to prevent NaN
  const rateFrom = rates[fromCurrency] || 1;
  const rateTo = rates[toCurrency] || 1;

  // Convert to Base (USD) then to Target
  return (val / rateFrom) * rateTo;
}

/**
 * Formats a number into a currency string.
 */
export function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Calculates total monthly cost.
 * - Handles YEARLY normalization (/12)
 * - Handles SPLIT COST (uses splitCost if > 0, otherwise full cost)
 */
export function calculateMonthlyBurnRate(
  items: any[],
  rates: Record<string, number>,
  baseCurrency: string
): number {
  return items.reduce((total, item) => {
    // 1. Determine Actual Cost (Use Split Cost if available)
    const rawCost = Number(item.splitCost) > 0 
      ? Number(item.splitCost) 
      : Number(item.cost);

    // 2. Convert to user's base currency
    const costInBase = convertTo(rawCost, item.currency, baseCurrency, rates);

    // 3. Normalize to monthly
    const monthlyCost = item.frequency === "YEARLY" ? costInBase / 12 : costInBase;

    return total + monthlyCost;
  }, 0);
}

/**
 * Main Logic Engine for the Dashboard.
 * Processes raw subscription data into usable metrics.
 */
export function processSubscriptionData(
  subs: any[],
  rates: Record<string, number>,
  baseCurrency: string
) {
  const activeSubs = subs.filter((s) => s.status === "ACTIVE");
  const cancelledSubs = subs.filter((s) => s.status === "CANCELLED");

  // 1. Separate "Real Financial Liability" from "Trials"
  // Trials should NOT count toward monthly burn
  const paidActiveSubs = activeSubs.filter(s => !s.isTrial);
  const trialActiveSubs = activeSubs.filter(s => s.isTrial);

  // 2. Monthly Burn (Real Money Leaving Bank)
  const monthlyBurn = calculateMonthlyBurnRate(paidActiveSubs, rates, baseCurrency);

  // 3. Annual Projection
  const annualProjection = monthlyBurn * 12;

  // 4. Active Trials Count
  const activeTrials = trialActiveSubs.length;

  // 5. Graveyard Stats (Money Saved from Cancelled Subs)
  const totalSavedMonthly = calculateMonthlyBurnRate(cancelledSubs, rates, baseCurrency);

  // 6. Redundancy Insights (Detect Duplicate Vendors)
  const redundancyInsights: any[] = [];
  const vendorMap: Record<string, { count: number; totalCost: number }> = {};

  activeSubs.forEach((sub) => {
    const name = sub.vendor?.name || sub.name || "Unknown";
    if (!vendorMap[name]) {
      vendorMap[name] = { count: 0, totalCost: 0 };
    }
    
    vendorMap[name].count += 1;

    // Only add to "Total Cost" if it's NOT a trial
    if (!sub.isTrial) {
        const rawCost = Number(sub.splitCost) > 0 ? Number(sub.splitCost) : Number(sub.cost);
        const costConverted = convertTo(rawCost, sub.currency, baseCurrency, rates);
        const monthly = sub.frequency === "YEARLY" ? costConverted / 12 : costConverted;
        vendorMap[name].totalCost += monthly;
    }
  });

  Object.entries(vendorMap).forEach(([name, data]) => {
    // Flag if duplicates exist (even if one is a trial)
    if (data.count > 1) {
      redundancyInsights.push({
        type: "DUPLICATE_VENDOR",
        message: `You have ${data.count} active subscriptions for ${name}.`,
        totalCost: data.totalCost, // Represents only the PAID cost
        vendors: [name],
      });
    }
  });

  // 7. Runway Stats (Simple 30/60/90 Day Projection)
  const runwayStats = {
    d30: monthlyBurn,
    d60: monthlyBurn * 2,
    d90: monthlyBurn * 3,
  };

  return {
    monthlyBurn,
    annualProjection,
    activeTrials,
    graveyardStats: {
      totalSavedMonthly,
    },
    redundancyInsights,
    runwayStats,
  };
}