export function formatPrice(price) {
  const numberFormat = new Intl.NumberFormat("id-ID");
  return numberFormat.format(Number(price));
}
