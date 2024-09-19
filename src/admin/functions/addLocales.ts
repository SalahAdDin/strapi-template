import { Core } from "@strapi/strapi";

type StrapiLocale = { code: string; name: string; isDefault?: boolean };

const locales: Array<StrapiLocale> = [
  { code: "es", name: "Spanish (es)" },
  { code: "tr", name: "Turkish (tr)" },
];

async function addLocale(locale: StrapiLocale, strapi: Core.Strapi) {
  const { code, name, isDefault = false } = locale;

  try {
    const existingLocale = await strapi
      .plugin("i18n")
      .service("locales")
      .findByCode(code);

    if (!existingLocale) {
      await strapi.plugin("i18n").service("locales").create({
        name,
        code,
        isDefault,
      });
      console.log(`Locale ${code} added successfully.`);
    } else {
      console.log(`Locale ${code} already exists.`);
    }
  } catch (error) {
    console.error(`Error adding locale ${code}:\n`, error);
  }
}

export const addLocales = async (strapi: Core.Strapi) => {
  console.info("\nAdding given locales to the admin.\n");

  for (const locale of locales) {
    await addLocale(locale, strapi);
  }

  console.info("\nLocales have been set up!");
};
