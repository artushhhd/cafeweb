import Link from "next/link";
import { ProductCard } from "@/app/ui/product-card";
import { getLatestProducts } from "@/lib/products";
import { getDictionary } from "@/lib/locale";
import { localize, localized } from "@/lib/i18n";
import { getSettings } from "@/lib/settings";

export async function generateMetadata() {
  const t = await getDictionary();

  return { title: t.nav.home };
}

export default async function HomePage() {
  const t = await getDictionary();
  const settings = await getSettings();
  const products = await getLatestProducts(3, t.locale);

  return (
    <div className="flex flex-col gap-12 py-10">
      <section className="card flex flex-col gap-5 p-6 sm:p-10">
        <p className="badge-muted self-start">
          {localized(settings, "working_hours", t.locale)}
        </p>
        <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {localized(settings, "tagline", t.locale)}
        </h1>
        <p className="max-w-xl text-muted">{t.home.intro}</p>
        <div className="flex flex-wrap gap-3">
          <Link href={localize(t.locale, "/shop")} className="btn btn-primary">
            {t.home.catalogCta}
          </Link>
          <Link href={localize(t.locale, "/register")} className="btn btn-ghost">
            {t.home.accountCta}
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-semibold">{t.home.latestTitle}</h2>
          <Link href={localize(t.locale, "/shop")} className="text-sm text-brand">
            {t.home.allCatalog}
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="text-muted">{t.home.emptyCatalog}</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {t.home.advantages.map((advantage) => (
          <div key={advantage.title} className="card flex flex-col gap-2 p-5">
            <h3 className="font-semibold">{advantage.title}</h3>
            <p className="text-sm text-muted">{advantage.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
