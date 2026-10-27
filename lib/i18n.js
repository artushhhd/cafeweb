export const DEFAULT_LOCALE = "hy";
export const LOCALES = ["hy", "en"];

const HY = {
  locale: "hy",
  switcher: { label: "Լեզու", hy: "Հայերեն", en: "English" },
  nav: {
    home: "Գլխավոր",
    shop: "Կատալոգ",
    login: "Մուտք",
    register: "Գրանցվել",
    logout: "Դուրս գալ",
    admin: "Կառավարում",
    profilePending: "Ստուգում ենք մուտքը…",
    accessPending: "Ստուգում ենք հասանելիությունը…",
  },
  home: {
    intro:
      "Վաճառում ենք սուրճի հատիկները 1 կգ պարկերով, սրճի մեքենաներ և պարագաներ։ Վերցրեք խանութից կամ պատվիրեք առաքում քաղաքով։",
    catalogCta: "Դիտել կատալոգը",
    accountCta: "Գրանցվել",
    latestTitle: "Նոր դիրքեր",
    allCatalog: "Ամբողջ կատալոգը",
    emptyCatalog: "Կատալոգը դեռ դատարկ է։",
    advantages: [
      {
        title: "Խորովածը պատվերով",
        text: "Հատիկներն ուղարկում ենք խորովածից ոչ ավելի, քան երկու օր անց, պարկին գրված է ամսաթիվը։",
      },
      {
        title: "Մանրացումը անվճար",
        text: "Մանրացնում ենք ձեր ֆիլտրի, գեյզերի կամ ռոժոկի տակ՝ առանց վճարի։",
      },
      {
        title: "Սպասարկում և երաշխիք",
        text: "Սրճի մեքենաներին տալիս ենք 24 ամսվա երաշխիք և վերանորոգում մեր արհեստանոցում։",
      },
    ],
  },
  shop: {
    title: "Կատալոգ",
    subtitle:
      "Ապրանքներն ու գները բերվում են շտեմարանից, մնացորդները թարմացնում է խանութի տերը։",
    empty:
      "Կատալոգում ապրանք դեռ չկա։ Մտեք կառավարման էջ և ավելացրեք առաջին դիրքը։",
    pieces: "հատ",
  },
  product: {
    back: "Հետ կատալոգ",
    soldOut: "Չկա մնացորդում",
    runningOut: (count) => `Կավարջվում է՝ ${count} հատ`,
    available: (count) => `Մնացորդում՝ ${count} հատ`,
    soldOutNote:
      "Դիրքը մնացորդում չկա՝ հեռախոսով հստակեցրեք մատուցման ամսաթիվը։",
    holdNote: "Զանգահարեք, որպեսզի դիրքը պահենք մեկ օրով։",
    callCta: "Զանգահարել",
    catalogCta: "Ամբողջ կատալոգը",
    externalCta: "Դիտել նկարագրությունը",
  },
  auth: {
    loginHeading: "Մուտք ձեր էջ",
    loginNote:
      "Գաղտնաբառը շտեմարանում պահվում է միայն որպես հեշ, գրառումից այն վերծանել հնարավոր չէ։",
    registerHeading: "Նոր էջ",
    registerNote:
      "Էջը անհրաժեշտ է գնորդին՝ անձնական էջի, իսկ խանութի տիրոջը՝ ապրանքացանկը կառավարելու համար։",
    name: "Անուն",
    email: "Էլ. փոստ",
    password: "Գաղտնաբառ",
    passwordRepeat: "Կրկնեք գաղտնաբառը",
    submitLogin: "Մտնել",
    pendingLogin: "Ստուգում ենք…",
    submitRegister: "Գրանցվել",
    pendingRegister: "Բացում ենք էջը…",
    badCredentials: "Սխալ էլ. փոստ կամ գաղտնաբառ։",
    emailTaken: "Այս էլ. հասցեն արդեն գրանցված է։ Մտեք համակարգ։",
    noAccount: "Դեռ չունե՞ք էջ։",
    registerLink: "Գրանցվեք",
    hasAccount: "Արդեն գրանցված ե՞ք։",
    loginLink: "Մտեք",
  },
  account: {
    title: "Իմ էջը",
    note: "Տվյալները կարդացվում են users և sessions աղյուսակներից, էջը ապրում է յոթ օր։",
    nameLabel: "Անուն",
    emailLabel: "Էլ. փոստ",
    roleLabel: "Դեր",
    idLabel: "ID շտեմարանում",
    roles: { admin: "Խանութի տեր", customer: "Գնորդ" },
    manageCta: "Կառավարել ապրանքացանկը",
    catalogCta: "Կատալոգ",
    logoutCta: "Դուրս գալ",
  },
  admin: {
    title: "Ապրանքացանկ",
    signedInAs: (email) =>
      `Դուք մտել եք որպես ${email}։ Փոփոխությունները անմիջապես հայտնվում են կատալոգում։`,
    newProduct: "Նոր ապրանք",
    submitAdd: "Ավելացնել ապրանք",
    listTitle: "Ապրանքներ շտեմարանում",
    emptyList: "Ցանկը դատարկ է՝ առաջին դիրքն ավելացրեք վերևում։",
    editItem: "Փոփոխել դիրքը",
    submitSave: "Պահպանել փոփոխությունները",
    saving: "Պահպանում ենք…",
    delete: "Ջնջել",
    deleteAria: (name) => `Ջնջել ${name}`,
    stockWord: "մնացորդ",
    pieces: "հատ",
    adminOnly: "Ապրանքացանկը կարող է փոփոխել միայն խանութի տերը։",
    productGone: "Այդպիսի ապրանք այլևս չկա՝ թարմացրեք էջը։",
    noId: "Ապրանքի ID-ն չի ուղարկվել։",
    nameLabel: "Անվանում",
    nameEnLabel: "Անվանում (English)",
    descriptionLabel: "Նկարագրություն",
    descriptionEnLabel: "Նկարագրություն (English)",
    categoryLabel: "Կատեգորիա",
    categoryEnLabel: "Կատեգորիա (English)",
    priceLabel: "Գին, ֏",
    stockLabel: "Մնացորդ, հատ",
    imageLabel: "Նկարի հասցե",
    urlLabel: "Հղում ապրանքին",
  },
  errors: {
    emailInvalid: "Մուտքագրեք ճիշտ էլ. հասցե, օրինակ owner@shop.am",
    nameLength: (min, max) => `Անունը պետք է լինի ${min}-ից ${max} նիշ։`,
    titleLength: (min, max) =>
      `Անվանումը պետք է լինի ${min}-ից ${max} նիշ։`,
    descriptionLength: (min, max) =>
      `Նկարագրությունը պետք է լինի ${min}-ից ${max} նիշ։`,
    categoryRequired: (max) => `Կատեգորիան պարտադիր է, առավելագույնը ${max} նիշ։`,
    passwordShort: (min) =>
      `Գաղտնաբառը պետք է լինի ոչ կարճ ${min} նիշ։`,
    passwordPattern: "Գաղտնաբառը պետք է ունենա գոնե մեկ տառ և մեկ թվանշան։",
    passwordMismatch: "Գաղտնաբառերը չեն համընկնում։",
    integerExpected: "Մուտքագրեք ամբողջ թիվ, օրինակ 8400։",
    tooBig: (max) => `Չափազանց մեծ արժեք, առավելագույնը ${max}։`,
    imagePath:
      "Նկարի հասցեն պետք է սկսվի / -ից և ցույց տա ֆայլ, օրինակ /products/coffee.jpg։",
    urlHttps:
      "Հղումը պետք է սկսվի https://-ից, օրինակ https://shop-example.am/coffee։",
  },
  notFound: {
    badge: "Սխալ 404",
    title: "Էջը չի գտնվել",
    text: "Հնարավոր է՝ ապրանքը սպառվել և հեռացել է կատալոգից, կամ հասցեում սխալ է։",
    ctaCatalog: "Կատալոգ",
    ctaHome: "Գլխավոր էջ",
  },
};

const EN = {
  locale: "en",
  switcher: HY.switcher,
  nav: {
    home: "Home",
    shop: "Catalog",
    login: "Sign in",
    register: "Sign up",
    logout: "Sign out",
    admin: "Manage",
    profilePending: "Checking your sign-in…",
    accessPending: "Checking access…",
  },
  home: {
    intro:
      "We sell coffee beans in 1 kg bags, machines and accessories. Pick them up in the shop or order delivery around town.",
    catalogCta: "Browse the catalog",
    accountCta: "Create an account",
    latestTitle: "New arrivals",
    allCatalog: "Full catalog",
    emptyCatalog: "The catalog is empty for now.",
    advantages: [
      {
        title: "Roasted to order",
        text: "Beans ship no more than two days after roasting, and the bag shows the date.",
      },
      {
        title: "Free grinding",
        text: "We grind for your dripper, AeroPress or portafilter at no extra cost.",
      },
      {
        title: "Service and warranty",
        text: "Machines come with a 24-month warranty and we repair them in our own workshop.",
      },
    ],
  },
  shop: {
    title: "Catalog",
    subtitle:
      "Products and prices come from the database; the owner keeps stock up to date.",
    empty:
      "There are no products yet. Open the manage page and add the first item.",
    pieces: "pcs",
  },
  product: {
    back: "Back to catalog",
    soldOut: "Out of stock",
    runningOut: (count) => `Running out: ${count} pcs`,
    available: (count) => `In stock: ${count} pcs`,
    soldOutNote: "This item is out of stock — call to check the delivery date.",
    holdNote: "Call us and we will hold the item for a day.",
    callCta: "Call us",
    catalogCta: "Full catalog",
    externalCta: "Read the full description",
  },
  auth: {
    loginHeading: "Sign in to your account",
    loginNote:
      "The password is stored in the database only as a hash, so it cannot be read back from the row.",
    registerHeading: "New account",
    registerNote:
      "Buyers need an account for their profile, and the shop owner needs one to manage the catalog.",
    name: "Name",
    email: "Email",
    password: "Password",
    passwordRepeat: "Repeat password",
    submitLogin: "Sign in",
    pendingLogin: "Checking…",
    submitRegister: "Sign up",
    pendingRegister: "Creating your account…",
    badCredentials: "Wrong email or password.",
    emailTaken: "This email is already registered. Sign in instead.",
    noAccount: "No account yet?",
    registerLink: "Sign up",
    hasAccount: "Already registered?",
    loginLink: "Sign in",
  },
  account: {
    title: "My account",
    note: "Details are read from the users and sessions tables, and a session lives for seven days.",
    nameLabel: "Name",
    emailLabel: "Email",
    roleLabel: "Role",
    idLabel: "Database id",
    roles: { admin: "Shop owner", customer: "Buyer" },
    manageCta: "Manage the catalog",
    catalogCta: "Catalog",
    logoutCta: "Sign out",
  },
  admin: {
    title: "Catalog",
    signedInAs: (email) =>
      `You are signed in as ${email}. Changes appear in the storefront right away.`,
    newProduct: "New product",
    submitAdd: "Add product",
    listTitle: "Products in the database",
    emptyList: "The list is empty — add the first item above.",
    editItem: "Edit this item",
    submitSave: "Save changes",
    saving: "Saving…",
    delete: "Delete",
    deleteAria: (name) => `Delete ${name}`,
    stockWord: "stock",
    pieces: "pcs",
    adminOnly: "Only the shop owner can change the catalog.",
    productGone: "That product is gone — reload the page.",
    noId: "The product id was not sent.",
    nameLabel: "Name",
    nameEnLabel: "Name (English)",
    descriptionLabel: "Description",
    descriptionEnLabel: "Description (English)",
    categoryLabel: "Category",
    categoryEnLabel: "Category (English)",
    priceLabel: "Price, ֏",
    stockLabel: "Stock, pcs",
    imageLabel: "Image path",
    urlLabel: "Product link",
  },
  errors: {
    emailInvalid: "Enter a valid email, for example owner@shop.am",
    nameLength: (min, max) => `Name must be ${min} to ${max} characters.`,
    titleLength: (min, max) => `Name must be ${min} to ${max} characters.`,
    descriptionLength: (min, max) =>
      `Description must be ${min} to ${max} characters.`,
    categoryRequired: (max) => `Category is required, up to ${max} characters.`,
    passwordShort: (min) => `Password must be at least ${min} characters.`,
    passwordPattern: "Password needs at least one letter and one digit.",
    passwordMismatch: "Passwords do not match.",
    integerExpected: "Enter a whole number, for example 8400.",
    tooBig: (max) => `Value is too large, the maximum is ${max}.`,
    imagePath:
      "The image path must start with / and point at a file, for example /products/coffee.jpg.",
    urlHttps:
      "The link must start with https://, for example https://shop-example.am/coffee.",
  },
  notFound: {
    badge: "Error 404",
    title: "Page not found",
    text: "The product may have sold out and left the catalog, or the address has a typo.",
    ctaCatalog: "Go to catalog",
    ctaHome: "Go home",
  },
};

const DICTIONARIES = { hy: HY, en: EN };

export function isLocale(value) {
  return typeof value === "string" && LOCALES.includes(value);
}

export function dictionary(locale) {
  return DICTIONARIES[isLocale(locale) ? locale : DEFAULT_LOCALE];
}

export function localize(locale, path) {
  const prefix = `/${isLocale(locale) ? locale : DEFAULT_LOCALE}`;
  if (path === "" || path === "/") {
    return prefix;
  }
  return `${prefix}${path}`;
}

export function localized(source, key, locale) {
  if (locale === DEFAULT_LOCALE) {
    return source[key];
  }
  return source[`${key}_en`] || source[key];
}

export function localeFromPath(pathname) {
  const first = pathname.split("/")[1];
  return isLocale(first) ? first : DEFAULT_LOCALE;
}
