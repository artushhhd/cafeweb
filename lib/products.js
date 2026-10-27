import { cacheLife, cacheTag } from "next/cache";
import { DEFAULT_LOCALE, localized } from "./i18n";
import { getDb, PRODUCT_COLUMNS } from "./db";

const PRODUCT_FIELDS = [
  "name",
  "description",
  "category",
  "name_en",
  "description_en",
  "category_en",
  "price",
  "stock",
  "image",
  "url",
];

function toProduct(row, locale = DEFAULT_LOCALE) {
  return {
    id: Number(row.id),
    name: localized(row, "name", locale),
    description: localized(row, "description", locale),
    category: localized(row, "category", locale),
    name_en: row.name_en,
    description_en: row.description_en,
    category_en: row.category_en,
    price: Number(row.price),
    stock: Number(row.stock),
    image: row.image,
    url: row.url,
  };
}

export async function getProducts(locale = DEFAULT_LOCALE) {
  "use cache";
  cacheTag("products");
  cacheLife("hours");

  return getDb()
    .prepare(`${PRODUCT_COLUMNS} order by category, name`)
    .all()
    .map((row) => toProduct(row, locale));
}

export async function getProduct(id, locale = DEFAULT_LOCALE) {
  "use cache";
  cacheTag("products", `product:${id}`);
  cacheLife("hours");

  const row = getDb()
    .prepare(`${PRODUCT_COLUMNS} where id = ?`)
    .get(Number(id));

  return row ? toProduct(row, locale) : null;
}

export async function getCategories(locale = DEFAULT_LOCALE) {
  "use cache";
  cacheTag("products");
  cacheLife("hours");

  return getDb()
    .prepare("select distinct category, category_en from products order by category")
    .all()
    .map((row) => localized(row, "category", locale));
}

export async function getLatestProducts(limit, locale = DEFAULT_LOCALE) {
  "use cache";
  cacheTag("products");
  cacheLife("hours");

  return getDb()
    .prepare(`${PRODUCT_COLUMNS} order by id desc limit ?`)
    .all(Number(limit))
    .map((row) => toProduct(row, locale));
}

export function insertProduct(product) {
  const columns = PRODUCT_FIELDS.join(", ");
  const placeholders = PRODUCT_FIELDS.map(() => "?").join(", ");

  getDb()
    .prepare(`insert into products (${columns}) values (${placeholders})`)
    .run(...PRODUCT_FIELDS.map((field) => product[field]));
}

export function updateProduct(id, product) {
  const assignments = PRODUCT_FIELDS.map((field) => `${field} = ?`).join(", ");

  const { changes } = getDb()
    .prepare(`update products set ${assignments} where id = ?`)
    .run(...PRODUCT_FIELDS.map((field) => product[field]), Number(id));

  return changes > 0;
}

export function deleteProduct(id) {
  const { changes } = getDb()
    .prepare("delete from products where id = ?")
    .run(Number(id));

  return changes > 0;
}
