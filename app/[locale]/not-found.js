import Link from "next/link";
import { locale } from "next/root-params";
import "../globals.css";
import { dictionary, localize } from "@/lib/i18n";

export async function generateMetadata() {
  const t = dictionary(await locale());

  return { title: t.notFound.title };
}

export default async function NotFound() {
  const t = dictionary(await locale());

  return (
    <div className="page-wrap flex min-h-dvh flex-col justify-center gap-4">
      <p className="badge-muted self-start">{t.notFound.badge}</p>
      <h1 className="text-2xl font-semibold tracking-tight">{t.notFound.title}</h1>
      <p className="max-w-md text-muted">{t.notFound.text}</p>
      <div className="flex flex-wrap gap-3">
        <Link href={localize(t.locale, "/shop")} className="btn btn-primary">
          {t.notFound.ctaCatalog}
        </Link>
        <Link href={localize(t.locale, "/")} className="btn btn-ghost">
          {t.notFound.ctaHome}
        </Link>
      </div>
    </div>
  );
}
