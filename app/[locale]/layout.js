import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Footer } from "@/app/ui/footer";
import { Header } from "@/app/ui/header";
import { LOCALES, localized } from "@/lib/i18n";
import { getDictionary } from "@/lib/locale";
import { getSettings } from "@/lib/settings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata() {
  const t = await getDictionary();
  const settings = await getSettings();
  const name = localized(settings, "shop_name", t.locale);
  const tagline = localized(settings, "tagline", t.locale);

  return {
    title: {
      default: `${name} — ${tagline}`,
      template: `%s | ${name}`,
    },
    description: tagline,
  };
}

export default async function RootLayout({ children }) {
  const t = await getDictionary();

  return (
    <html
      lang={t.locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="page-wrap flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
