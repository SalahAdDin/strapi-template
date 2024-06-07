import type { StrapiApp } from "@strapi/strapi/admin";
import { registerTranslations } from "../functions/registerTranslations";

const localesPath = "../admin/translations";
const locales = [
  // 'ar',
  // 'fr',
  // 'cs',
  // 'de',
  // 'dk',
  "en",
  "es",
  // 'he',
  // 'id',
  // 'it',
  // 'ja',
  // 'ko',
  // 'ms',
  // 'nl',
  // 'no',
  // 'pl',
  // 'pt-BR',
  // 'pt',
  // 'ru',
  // 'sk',
  // 'sv',
  // 'th',
  "tr",
  // 'uk',
  // 'vi',
  // 'zh-Hans',
  // 'zh',
];

const translations = await registerTranslations({ locales, path: localesPath });

export default {
  config: {
    locales,
    translations,
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};
