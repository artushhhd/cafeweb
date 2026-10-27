import { mkdirSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { hashPassword } from "./passwords";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "shop.db");
const GLOBAL_KEY = Symbol.for("shop.db");

const SCHEMA = `
  pragma journal_mode = wal;
  pragma foreign_keys = on;

  create table if not exists users (
    id integer primary key autoincrement,
    name text not null,
    email text not null unique,
    password_hash text not null,
    role text not null default 'customer' check (role in ('customer', 'admin')),
    created_at text not null default (datetime('now'))
  );

  create table if not exists sessions (
    id integer primary key autoincrement,
    token_hash text not null unique,
    user_id integer not null references users (id) on delete cascade,
    expires_at integer not null
  );

  create index if not exists sessions_token_idx on sessions (token_hash);

  create table if not exists products (
    id integer primary key autoincrement,
    name text not null,
    description text not null,
    category text not null,
    price integer not null check (price >= 0),
    stock integer not null default 0 check (stock >= 0),
    image text,
    url text,
    created_at text not null default (datetime('now'))
  );

  create index if not exists products_category_idx on products (category);

  create table if not exists settings (
    key text primary key,
    value text not null
  );
`;

const DEMO_PRODUCTS = [
  {
    name: "Սուրճի հատիկ Իրգաչեֆ 1 կգ",
    description:
      "Եթովպիայի լվացված հատիկներ՝ նռան ծաղիկ, կիտրոն, թեթև մարմին։ Ֆիլտրի համար։",
    category: "Սուրճի հատիկներ",
    nameEn: "Irgacheffe Coffee Beans 1 kg",
    descriptionEn:
      "Washed Ethiopian beans: jasmine, lemon, light body. For pour-over.",
    categoryEn: "Coffee beans",
    price: 8400,
    stock: 24,
    image: "/products/coffee-irgacheffe.jpg",
    legacyName: "Кофе арабика Иргачефф 1 кг",
  },
  {
    name: "Էսպրեսո խառնուրդ «Տնական» 1 կգ",
    description:
      "Բրազիլիա և Հնդկաստան՝ շոկոլադ, ընկույզ, խիտ կրեմա։ Ռոժոկային մեքենայի համար։",
    category: "Սուրճի հատիկներ",
    nameEn: "House Espresso Blend 1 kg",
    descriptionEn:
      "Brazil and India: chocolate, nuts, dense crema. For portafilter machines.",
    categoryEn: "Coffee beans",
    price: 6500,
    stock: 40,
    image: "/products/coffee-espresso.jpg",
    legacyName: "Эспрессо купаж Домашний 1 кг",
  },
  {
    name: "Դեկաֆ կոլումբիական 500 գ",
    description: "Կոֆեինը հեռացված է շաքարի օշարկով, առանց քիմիական հետհամի։",
    category: "Սուրճի հատիկներ",
    nameEn: "Colombian Decaf 500 g",
    descriptionEn: "Caffeine removed with sugar syrup, no chemical aftertaste.",
    categoryEn: "Coffee beans",
    price: 4200,
    stock: 0,
    image: "/products/coffee-decaf.jpg",
    legacyName: "Декаф колумбийский 500 г",
  },
  {
    name: "Էսպրեսո մեքենա Duo 58 մմ",
    description:
      "Երկու բոյլերով, PID կարգավորիչ, 58 մմ խումբ։ 24 ամսվա երաշխիք։",
    category: "Սարքավորումներ",
    nameEn: "Duo Espresso Machine 58 mm",
    descriptionEn: "Dual boiler, PID controller, 58 mm group. 24-month warranty.",
    categoryEn: "Equipment",
    price: 320000,
    stock: 3,
    image: "/products/machine-duo.jpg",
    legacyName: "Рожковая кофеварка Duo 58 мм",
  },
  {
    name: "Սրճի աղոտիչ Single Dose 64",
    description: "64 մմ, 40 մանրացման աստիճան, չափում կշռով։",
    category: "Սարքավորումներ",
    nameEn: "Single Dose Coffee Grinder 64",
    descriptionEn: "64 mm burrs, 40 grind settings, dose by weight.",
    categoryEn: "Equipment",
    price: 145000,
    stock: 6,
    image: "/products/grinder-single-dose.jpg",
    legacyName: "Кофемолка Single Dose 64",
  },
  {
    name: "Տամպեր հավասարեցված 58.5 մմ",
    description: "Ալյումինե կորպուս, ճշգրիտ նստում ռոժոկի մեջ, հեռացվող բռնակ։",
    category: "Պարագաներ",
    nameEn: "Calibrated Tamper 58.5 mm",
    descriptionEn: "Aluminium body, precise fit in the portafilter, removable handle.",
    categoryEn: "Accessories",
    price: 18500,
    stock: 15,
    image: "/products/tamper-58.jpg",
    legacyName: "Тампер калиброванный 58.5 мм",
  },
  {
    name: "Կաթի աման 600 մլ քիթով",
    description: "Չժանգվող պողպտ, ներսի չափագիծ լատե-արտի համար։",
    category: "Պարագաներ",
    nameEn: "600 ml Milk Jug with Spout",
    descriptionEn: "Stainless steel, internal graduations for latte art.",
    categoryEn: "Accessories",
    price: 12000,
    stock: 12,
    image: "/products/milk-jug-600.jpg",
    legacyName: "Молочник 600 мл с носиком",
  },
  {
    name: "Թղթե ֆիլտրեր 100 հատ",
    description: "Սպիտակեցված առանց քլորի, V60 02 չափի համար։",
    category: "Պարագաներ",
    nameEn: "Paper Filters 100 pcs",
    descriptionEn: "Chlorine-free bleached, for V60 size 02.",
    categoryEn: "Accessories",
    price: 3500,
    stock: 60,
    image: "/products/filters-v60.jpg",
    legacyName: "Фильтры бумажные 100 шт",
  },
];

const DEMO_USERS = [
  {
    name: "Ցուցադրական բարիստա",
    legacyName: "Бариста-demo",
    email: "barista.example@gmail.com",
    password: "Barista2026",
  },
  {
    name: "Ցուցադրական գնորդ",
    legacyName: "Покупатель-demo",
    email: "client.example@gmail.com",
    password: "Client2026",
  },
];

const SHOP_SETTINGS = [
  ["shop_name", "Հատիկ և Գոլոր", "Bean & Steam"],
  ["tagline", "Թարմ խորոված և սարքավորումներ տան համար", "Fresh roasts and gear for home"],
  ["phone", "+374 91 240-165"],
  ["address", "Երևան, Մաշտոցի պողոտա 12", "12 Mashtots Avenue, Yerevan"],
  ["working_hours", "Երկ–Շաբ, 09:00–20:00", "Mon–Sat, 09:00–20:00"],
];

const LEGACY_SETTINGS = {
  shop_name: "Зёрна и Пар",
  tagline: "Свежая обжарка и оборудование для дома",
  phone: "+998 90 123-45-67",
  address: "Ташкент, ул. Обжарочная, 12",
  working_hours: "Пн–Сб, 09:00–20:00",
};

function seedSettings(db) {
  const find = db.prepare("select value from settings where key = ?");
  const replace = db.prepare("update settings set value = ? where key = ?");
  const insert = db.prepare("insert or ignore into settings (key, value) values (?, ?)");

  for (const [key, value, valueEn] of SHOP_SETTINGS) {
    const row = find.get(key);

    if (!row) {
      insert.run(key, value);
    } else if (row.value === LEGACY_SETTINGS[key]) {
      replace.run(value, key);
    }

    if (valueEn) {
      insert.run(`${key}_en`, valueEn);
    }
  }
}

function seedProducts(db) {
  const { n } = db.prepare("select count(*) as n from products").get();

  if (n === 0) {
    const insert = db.prepare(
      `insert into products
         (name, description, category, name_en, description_en, category_en, price, stock, image)
       values (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );
    for (const product of DEMO_PRODUCTS) {
      insert.run(
        product.name,
        product.description,
        product.category,
        product.nameEn,
        product.descriptionEn,
        product.categoryEn,
        product.price,
        product.stock,
        product.image
      );
    }
    return;
  }

  const translate = db.prepare(
    `update products
       set name = ?, description = ?, category = ?, name_en = ?, description_en = ?,
           category_en = ?, price = ?, image = ?
     where name in (?, ?) and name_en is null`
  );
  for (const product of DEMO_PRODUCTS) {
    translate.run(
      product.name,
      product.description,
      product.category,
      product.nameEn,
      product.descriptionEn,
      product.categoryEn,
      product.price,
      product.image,
      product.legacyName,
      product.name
    );
  }
}

function seedUsers(db) {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  const find = db.prepare("select id, name from users where email = ?");
  const insert = db.prepare(
    "insert into users (name, email, password_hash, role) values (?, ?, ?, 'customer')"
  );
  const rename = db.prepare("update users set name = ? where email = ? and name = ?");

  for (const user of DEMO_USERS) {
    const email = user.email.toLowerCase();
    const row = find.get(email);

    if (row) {
      rename.run(user.name, email, user.legacyName);
      continue;
    }
    insert.run(user.name, email, hashPassword(user.password));
  }
}

function seedAdmin(db) {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    return;
  }

  const existing = db.prepare("select id from users where email = ?").get(email);
  if (existing) {
    return;
  }

  db.prepare(
    "insert into users (name, email, password_hash, role) values (?, ?, ?, 'admin')"
  ).run("Владелец магазина", email, hashPassword(password));
}

const ADDED_PRODUCT_COLUMNS = [
  ["image", "alter table products add column image text"],
  ["url", "alter table products add column url text"],
  ["name_en", "alter table products add column name_en text"],
  ["description_en", "alter table products add column description_en text"],
  ["category_en", "alter table products add column category_en text"],
];

function ensureProductColumns(db) {
  const columns = db
    .prepare("pragma table_info (products)")
    .all()
    .map((column) => column.name);

  for (const [name, sql] of ADDED_PRODUCT_COLUMNS) {
    if (!columns.includes(name)) {
      db.exec(sql);
    }
  }
}

function createDatabase() {
  mkdirSync(DATA_DIR, { recursive: true });
  const db = new DatabaseSync(DB_PATH);
  db.exec(SCHEMA);
  ensureProductColumns(db);
  seedSettings(db);
  seedProducts(db);
  seedAdmin(db);
  seedUsers(db);
  return db;
}

export function getDb() {
  if (!globalThis[GLOBAL_KEY]) {
    globalThis[GLOBAL_KEY] = createDatabase();
  }
  return globalThis[GLOBAL_KEY];
}

export const PRODUCT_COLUMNS =
  "select id, name, description, category, name_en, description_en, category_en, price, stock, image, url from products";
