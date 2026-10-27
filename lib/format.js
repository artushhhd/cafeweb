import { dictionary } from "./i18n";

const CURRENCY = "AMD";

function priceFormatter(locale) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: CURRENCY,
    maximumFractionDigits: 0,
  });
}

export function formatPrice(amount, locale) {
  return priceFormatter(locale).format(amount);
}

export function formatStock(stock, locale) {
  const t = dictionary(locale).product;

  if (stock <= 0) {
    return t.soldOut;
  }
  if (stock <= 5) {
    return t.runningOut(stock);
  }
  return t.available(stock);
}

export function initialsOf(name) {
  return String(name ?? "?")
    .trim()
    .slice(0, 1)
    .toUpperCase();
}
