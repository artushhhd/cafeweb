import { cacheLife, cacheTag } from "next/cache";
import { getDb } from "./db";

const DEFAULTS = {
  shop_name: "Հատիկ և Գոլոր",
  tagline: "",
  phone: "",
  address: "",
  working_hours: "",
};

export async function getSettings() {
  "use cache";
  cacheTag("settings");
  cacheLife("hours");

  const rows = getDb().prepare("select key, value from settings").all();
  const settings = { ...DEFAULTS };

  for (const row of rows) {
    settings[row.key] = row.value;
  }

  return settings;
}
