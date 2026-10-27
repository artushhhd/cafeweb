# Հատիկ և Գոլոր (Bean & Steam) — сайт магазина на Next.js

Небольшой магазин кофе и оборудования: каталог из SQLite, регистрация и вход,
роль администратора, которая редактирует ассортимент. Витрина на двух языках —
армянском (по умолчанию) и английском, цены в драмах.

## Запуск

```bash
npm run dev      # http://localhost:3000
npm run build    # production-сборка
npm run lint     # проверка eslint
```

База лежит в `data/shop.db` (файл в `.gitignore`). Она создаётся сама при первом
запросе: таблицы, демо-товары, настройки магазина и учётные записи.

## Языки

Все страницы живут в `app/[locale]`, где `locale` — `hy` или `en`. Корневой
layout там же (`app/[locale]/layout.js`), поэтому `locale` — root param, и его
читают через `next/root-params`:

- `lib/i18n.js` — словари `HY` и `EN` и чистые хелперы `dictionary`, `localize`,
  `localized`, `localeFromPath`; файл можно импортировать и в клиентских
  компонентах
- `lib/locale.js` — `localeCode()` и `getDictionary()`: единственное место, где
  читается root param; неверный `locale` даёт `notFound()`
- `proxy.js` — редирект без языковой приставки: `/` → `/hy`, `/shop` → `/hy/shop`
- переключатель в шапке — `app/ui/language-switcher.js`, он меняет только первую
  часть URL и сохраняет текущую страницу

Ссылки внутри приложения строятся через `localize(locale, path)`, поэтому
`href` всегда с префиксом языка.

### Данные в двух языках

Товары и настройки магазина приходят из базы, списки в JSX не захардкожены.
Текст на английском лежит в отдельных колонках: у товаров это `name_en`,
`description_en`, `category_en`, у настроек — ключи `shop_name_en`,
`tagline_en`, `address_en`, `working_hours_en`. Читает их `toProduct(row, locale)`
в `lib/products.js` через `localized()`: если перевода нет, показывается
армянская строка. Кэшированные чтения (`getProducts`, `getProduct`,
`getCategories`, `getLatestProducts`) принимают `locale` параметром, то есть на
каждый язык своя запись кэша.

Соответственно при переходе на `/en` меняется и название магазина в шапке, и
категории, и карточки товаров.

### Формы и Server Actions

Root params в Server Actions недоступны, поэтому язык приезжает с формы в скрытом
поле `locale`. `formLocale(formData)` в `lib/forms.js` его проверяет и падает на
`hy` при неверном значении; все сообщения валидации берутся из
`dictionary(locale).errors`, а редиректы после входа, регистрации и сохранения
товара идут в `localize(locale, ...)`.

### Переход на два языка

`seedProducts` и `seedSettings` в `lib/db.js` один раз переводят строки,
записанные до i18n: условие `name_en is null` (для настроек — совпадение со
старым русским значением из `LEGACY_SETTINGS`). Повторный запуск ничего не
трогает, поэтому свои товары и правки админки миграция не перезаписывает.

## Цены

В базе цена — целое число драм, колонка `products.price`. Форматирует её
`formatPrice(amount, locale)` в `lib/format.js` через
`Intl.NumberFormat` с `currency: "AMD"` и без копеек: на армянской витрине —
`8 400 ֏`, на английской — `AMD 8,400`. Остаток подписан тем же языком
(`formatStock`). Лимит на ввод цены в `lib/forms.js` — 100 000 000.

## Учётные записи

| Роль | Email | Пароль | Откуда |
| --- | --- | --- | --- |
| админ | `owner@example.com` | `Barista2026` | `ADMIN_EMAIL` / `ADMIN_PASSWORD` в `.env.local` |
| клиент | `barista.example@gmail.com` | `Barista2026` | сидер `DEMO_USERS` в `lib/db.js` |
| клиент | `client.example@gmail.com` | `Client2026` | сидер `DEMO_USERS` в `lib/db.js` |

Демо-клиенты создаются только когда `NODE_ENV !== "production"`, и повторный
запуск ничего не дублирует. Пароли из таблицы `ADMIN_*` действуют и в
production, поэтому в `.env.local` их надо менять.

## Картинки и ссылки товаров

Путь к картинке хранится в колонке `products.image`, внешняя ссылка — в
`products.url`. Витрина показывает картинку компонентом
`app/ui/product-image.js`, а при пустой колонке — плитку с инициалами. Если у
товара есть `url`, на странице товара появляется кнопка `t.product.externalCta`.

Фотографии скачаны в `public/products/` с Wikimedia Commons, формат 1000 px по
длинной стороне. Своё фото: положить файл в `public/products/` и вписать путь в
форме товара в админке. Форматы — `.jpg`, `.png`, `.webp`, `.svg`.

Ссылка проверяется в `lib/forms.js`: только `https://`, без пробелов, до 300
символов. `javascript:` и `data:` не проходят.

Атрибуция по лицензиям источников:

| Файл | Лицензия | Автор | Источник |
| --- | --- | --- | --- |
| `coffee-irgacheffe.jpg` | CC BY-SA 4.0 | Jamain | commons: File:A bag of coffee J1.jpg |
| `coffee-espresso.jpg` | Public domain | MarkSweep | commons: File:Roasted coffee beans.jpg |
| `coffee-decaf.jpg` | CC BY-SA 3.0 | Jkafader | commons: File:Green Decaffeinated Brazilian Coffee Sack.JPG |
| `machine-duo.jpg` | CC BY-SA 3.0 | Herr Andrax | commons: File:Espresso machine 1.jpg |
| `grinder-single-dose.jpg` | CC0 | Retired electrician | commons: File:Five-dollar coffee grinder, Nov 2025 02.jpg |
| `tamper-58.jpg` | CC BY 3.0 | Olaf Kosinsky | commons: File:Espresso-Tamper 02.jpg |
| `milk-jug-600.jpg` | CC BY-SA 3.0 | Daniel Case | commons: File:Barista frothing milk for cappuccino at Tabak shop in Esino Lario.jpg |
| `filters-v60.jpg` | CC BY-SA 3.0 | Elke Wetzig (Elya) | commons: File:Kaffeefilter.jpg |

## 404

`app/[locale]/not-found.js` рисует локализованный экран «страница не найдена», а
`app/[locale]/[...rest]/page.js` ловит адреса без такой страницы (`/hy/nope`) и
вызывает `notFound()`. Язык берётся из root param, поэтому экран на месте и на
`/hy`, и на `/en`.

## Структура

- `lib/db.js` — схема, сидеры и singleton соединения с базой
- `lib/i18n.js`, `lib/locale.js` — словари, хелперы и чтение locale
- `lib/products.js`, `lib/settings.js` — чтение с кэшем (`use cache` + `cacheTag`)
- `lib/format.js` — цена в драмах и подпись остатка
- `lib/dal.js` — проверка сессии и роли для страниц и экшенов
- `app/actions/` — Server Actions: регистрация, вход, сохранение товара
- `app/[locale]/` — страницы: витрина, товар, аккаунт, админка
- `app/ui/` — шапка, подвал, карточки, формы, переключатель языка
- `proxy.js` — редирект на `/hy`, если в URL нет языка

## Что стоит проверить перед демо

- армянские формулировки: их писал не носитель, часть фраз звучит буквально
- цены в драмах — мои оценки, а не прайс магазина
- админка показывает базовую (армянскую) строку товара, английские колонки
  редактируются в тех же полях с суффиксом `_en`
