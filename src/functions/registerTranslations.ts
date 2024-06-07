type TranslationData = Record<string, Object>;

export const registerTranslations = async ({
  locales,
  path,
}: {
  locales: Array<string>;
  path: string;
}) => {
  const results = await Promise.all(
    locales.map((locale) => {
      return import(`${path}/${locale}.json`)
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
