import { Suspense } from "react";
import { removeProductAction, saveProductAction } from "@/app/actions/products";
import { formatPrice } from "@/lib/format";
import { getCategories, getProducts } from "@/lib/products";
import { requireAdmin } from "@/lib/dal";
import { getDictionary } from "@/lib/locale";
import { ProductForm } from "@/app/ui/product-form";

export async function generateMetadata() {
  const t = await getDictionary();

  return { title: t.admin.title };
}

export default async function AdminPage() {
  const t = await getDictionary();

  return (
    <Suspense fallback={<p className="py-10 text-muted">{t.nav.accessPending}</p>}>
      <AdminPanel />
    </Suspense>
  );
}

async function AdminPanel() {
  const t = await getDictionary();
  const admin = await requireAdmin();
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-10 py-10">
      <datalist id="shop-categories">
        {categories.map((category) => (
          <option key={category} value={category} />
        ))}
      </datalist>

      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">{t.admin.title}</h1>
        <p className="text-muted">{t.admin.signedInAs(admin.email)}</p>
      </header>

      <section className="card flex flex-col gap-4 p-6">
        <h2 className="text-lg font-semibold">{t.admin.newProduct}</h2>
        <ProductForm
          formId="new-product"
          locale={t.locale}
          action={saveProductAction}
          submitLabel={t.admin.submitAdd}
        />
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-semibold">{t.admin.listTitle}</h2>
          <span className="badge-muted">
            {products.length} {t.admin.pieces}
          </span>
        </div>

        {products.length === 0 ? (
          <p className="card p-6 text-muted">{t.admin.emptyList}</p>
        ) : (
          <div className="flex flex-col gap-4">
            {products.map((product) => (
              <article key={product.id} className="card flex flex-col gap-4 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted">
                      #{product.id} · {product.category} ·{" "}
                      {formatPrice(product.price, t.locale)} ·{" "}
                      {t.admin.stockWord} {product.stock} {t.admin.pieces}
                    </p>
                  </div>

                  <form action={removeProductAction}>
                    <input type="hidden" name="locale" value={t.locale} />
                    <input type="hidden" name="id" value={product.id} />
                    <button
                      type="submit"
                      className="btn btn-ghost"
                      aria-label={t.admin.deleteAria(product.name)}
                    >
                      {t.admin.delete}
                    </button>
                  </form>
                </div>

                <details className="flex flex-col gap-3">
                  <summary className="cursor-pointer text-sm text-brand">
                    {t.admin.editItem}
                  </summary>
                  <ProductForm
                    formId={`product-${product.id}`}
                    locale={t.locale}
                    product={product}
                    action={saveProductAction}
                    submitLabel={t.admin.submitSave}
                  />
                </details>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
