import { NextResponse } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (LOCALES.includes(pathname.split("/")[1])) {
    return;
  }

  const target = request.nextUrl.clone();
  target.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(target);
}

export const config = {
  matcher: "/((?!api|_next|.*\\..*).*)",
};
