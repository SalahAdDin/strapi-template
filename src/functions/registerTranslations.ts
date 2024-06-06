type TranslationData = Record<string, Object>;

export const registerTranslations = async ({
  locales,
}: {
  locales: Array<string>;
}) => {
  const results = await Promise.all(
    locales.map((locale) => {
      return import(`../admin/translations/${locale}.json`)
        .then(({ default: data }) => {
          return {
            locale,
            data,
          };
        })
        .catch(() => {
          return {
            locale,
            data: {},
          };
        });
    })
  );

  let importedTranslations: TranslationData = {};

  results.forEach(({ locale, data }) => {
    importedTranslations[locale] = data;
  });

  return importedTranslations;
};
