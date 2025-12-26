export const CURRENCIES = ["USD", "PHP", "EUR", "GBP", "AUD", "CAD", "JPY"];

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  PHP: "₱",
  EUR: "€",
  GBP: "£",
  AUD: "A$",
  CAD: "C$",
  JPY: "¥",
};

export function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

// 👇 ADD THIS FUNCTION
export function convertTo(amount: number, from: string, to: string, rates: Record<string, number>) {
  if (from === to) return amount;
  const fromRate = rates[from] || 1;
  const toRate = rates[to] || 1;
  return (amount / fromRate) * toRate;
}