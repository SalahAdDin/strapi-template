type TranslationData = Record<string, Object>;

export const registerTranslations = async ({
  locales,
}: {
  locales: Array<string>;
}) => {
  const results = await Promise.all(
    locales.map(async (locale) => {
      try {
        const { default: data } = await import(
          `../admin/translations/${locale}.json`
        );
        return {
          locale,
          data,
        };
      } catch {
        return {
          locale,
          data: {},
        };
      }
    })
  );

  let importedTranslations: TranslationData = {};

  results.forEach(({ locale, data }) => {
    importedTranslations[locale] = data;
  });

  return importedTranslations;
};
