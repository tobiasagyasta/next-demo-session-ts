export const SHIPPING_COST = 5;
export const TAX_RATE = 0.1;

export function normalizeQuantity(qtyParam: string | null): number {
  const parsed = qtyParam ? Number.parseInt(qtyParam, 10) : Number.NaN;
  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }
  return parsed;
}

export function calculateSubtotal(price: number, qty: number): number {
  return price * qty;
}

export function calculateTax(subtotal: number, taxRate: number): number {
  return subtotal * taxRate;
}

export function calculateOrderTotal(
  subtotal: number,
  shipping: number,
  tax: number,
): number {
  return subtotal + shipping + tax;
}

export function formatCurrency(amount: number): string {
  if (!Number.isFinite(amount)) {
    return "$0.00";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
