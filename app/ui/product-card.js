import Link from "next/link";
import { ProductImage } from "@/app/ui/product-image";
import { formatPrice, formatStock } from "@/lib/format";
import { localize } from "@/lib/i18n";
import { localeCode } from "@/lib/locale";

const CARD_SIZES = "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw";

export async function ProductCard({ product }) {
  const locale = await localeCode();
  const soldOut = product.stock <= 0;

  return (
    <article className="card flex flex-col overflow-hidden">
      <Link
        href={localize(locale, `/shop/${product.id}`)}
        className="flex flex-1 flex-col gap-3 p-4 hover:bg-brand-soft/40"
      >
        <ProductImage product={product} sizes={CARD_SIZES} />
        <h3 className="text-base font-semibold leading-snug">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-muted">{product.description}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
          <span className="font-semibold">{formatPrice(product.price, locale)}</span>
          <span className={soldOut ? "badge-warn" : "badge-muted"}>
            {formatStock(product.stock, locale)}
          </span>
        </div>
      </Link>
    </article>
  );
}
