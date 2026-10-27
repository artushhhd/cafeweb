import { notFound } from "next/navigation";
import { locale } from "next/root-params";
import { dictionary, isLocale } from "./i18n";

export async function localeCode() {
  const value = await locale();
  if (!isLocale(value)) {
    notFound();
  }
  return value;
}

export async function getDictionary() {
  return dictionary(await localeCode());
}
