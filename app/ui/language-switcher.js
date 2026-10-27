"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, dictionary, isLocale, localize } from "@/lib/i18n";

function withoutLocale(pathname) {
  const segments = pathname.split("/");

  if (isLocale(segments[1])) {
    segments.splice(1, 1);
  }

  const rest = segments.join("/");
  return rest === "" ? "/" : rest;
}

export function LanguageSwitcher({ locale }) {
  const pathname = usePathname();
  const t = dictionary(locale);
  const rest = withoutLocale(pathname);

  return (
    <>
      {LOCALES.map((code) => (
        <Link
          key={code}
          href={localize(code, rest)}
          lang={code}
          className={
            code === locale
              ? "nav-link font-semibold text-brand-dark"
              : "nav-link"
          }
        >
          {t.switcher[code]}
        </Link>
      ))}
    </>
  );
}
