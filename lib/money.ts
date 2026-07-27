// Guatemalan Quetzal (GTQ). Prices are stored in cents (Q1 = 100).
const formatter = new Intl.NumberFormat("es-GT", {
  style: "currency",
  currency: "GTQ",
});

/** Format a price given in cents (e.g. 260000 -> "Q2,600.00"). */
export function formatPrice(cents: number): string {
  return formatter.format(cents / 100);
}
