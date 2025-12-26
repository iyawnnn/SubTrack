import { BillingFrequency } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

type CostItem = {
  cost: Decimal | number;
  currency: string;
  frequency: BillingFrequency | string;
};

// Standard conversion map (In production, fetch these live)
// This serves as a fallback or if no rate map is passed
const DEFAULT_RATES: Record<string, number> = {
  USD: 1,
  PHP: 56.5,
  EUR: 0.92,
  GBP: 0.79,
  AUD: 1.52,
  CAD: 1.35,
  JPY: 150.2,
};

/**
 * Calculates the total monthly burn rate normalized to a base currency.
 * Formula: Sum ( (Price / Rate_From) * Rate_To ) normalized to monthly
 */
export function calculateMonthlyBurnRate(
  items: CostItem[],
  rates: Record<string, number> = DEFAULT_RATES,
  baseCurrency: string = "USD"
): number {
  const targetRate = rates[baseCurrency] || 1;

  return items.reduce((total, item) => {
    const amount = Number(item.cost);
    const itemRate = rates[item.currency] || 1;

    // 1. Normalize to USD (Base 1.0)
    const amountInUSD = amount / itemRate;

    // 2. Convert to Target Base Currency
    const amountInBase = amountInUSD * targetRate;

    // 3. Normalize to Monthly frequency
    if (item.frequency === "YEARLY") {
      return total + amountInBase / 12;
    }

    return total + amountInBase;
  }, 0);
}
