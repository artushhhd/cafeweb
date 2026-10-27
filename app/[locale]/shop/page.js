import { ProductCard } from "@/app/ui/product-card";
import { getCategories, getProducts } from "@/lib/products";
import { getDictionary } from "@/lib/locale";

export async function generateMetadata() {
  const t = await getDictionary();

  return { title: t.shop.title };
}

function groupByCategory(products, categories) {
  return categories
    .map((category) => ({
      category,
      items: products.filter((product) => product.category === category),
    }))
    .filter((group) => group.items.length > 0);
}

export default async function ShopPage() {
  const t = await getDictionary();
  const products = await getProducts(t.locale);
  const categories = await getCategories(t.locale);
  const groups = groupByCategory(products, categories);

  return (
    <div className="flex flex-col gap-10 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{t.shop.title}</h1>
        <p className="text-muted">{t.shop.subtitle}</p>
      </header>

      {groups.length === 0 ? (
        <p className="card p-6 text-muted">{t.shop.empty}</p>
      ) : (
        groups.map((group) => (
          <section key={group.category} className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-xl font-semibold">{group.category}</h2>
              <span className="badge-muted">
                {group.items.length} {t.shop.pieces}
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
