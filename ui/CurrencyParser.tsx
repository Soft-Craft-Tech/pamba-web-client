export default function CurrencyFormatter(amount: number): string {
  const formattedAmount: string = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(amount);
  return formattedAmount;
}
