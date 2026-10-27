import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductImage } from "@/app/ui/product-image";
import { formatPrice, formatStock } from "@/lib/format";
import { getProduct } from "@/lib/products";
import { getDictionary } from "@/lib/locale";
import { localize } from "@/lib/i18n";
import { getSettings } from "@/lib/settings";

export const instant = false;

const DETAIL_SIZES = "(max-width: 640px) 92vw, 320px";

export async function generateMetadata({ params }) {
  const { id, locale } = await params;
  const product = await getProduct(id, locale);

  if (!product) {
    return {};
  }

  return { title: product.name };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const t = await getDictionary();
  const product = await getProduct(id, t.locale);

  if (!product) {
    notFound();
  }

  const settings = await getSettings();
  const soldOut = product.stock <= 0;

  return (
    <div className="flex flex-col gap-8 py-10">
      <Link href={localize(t.locale, "/shop")} className="text-sm text-brand">
        {t.product.back}
      </Link>

      <div className="grid gap-6 sm:grid-cols-[minmax(0,320px)_1fr]">
        <ProductImage product={product} sizes={DETAIL_SIZES} />

        <div className="flex flex-col gap-4">
          <p className="badge-muted self-start">{product.category}</p>
          <h1 className="text-2xl font-semibold leading-tight">{product.name}</h1>
          <p className="text-muted">{product.description}</p>

          <div className="card flex flex-wrap items-center justify-between gap-3 p-4">
            <span className="text-xl font-semibold">
              {formatPrice(product.price, t.locale)}
            </span>
            <span className={soldOut ? "badge-warn" : "badge-muted"}>
              {formatStock(product.stock, t.locale)}
            </span>
          </div>

          <p className="text-sm text-muted">
            {soldOut ? t.product.soldOutNote : t.product.holdNote}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`}
              className="btn btn-primary"
            >
              {settings.phone}
            </a>
            <Link href={localize(t.locale, "/shop")} className="btn btn-ghost">
              {t.product.catalogCta}
            </Link>
            {product.url ? (
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                {t.product.externalCta}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
