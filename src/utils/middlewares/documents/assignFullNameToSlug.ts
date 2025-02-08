/**
 * `assignFullNameToSlug` document middleware
 */

import type { Core } from "@strapi/strapi";

export default ({ strapi }: { strapi: Core.Strapi }) => {
  const applyTo = ["api::profile.profile"];

  strapi.documents.use(async (context, next) => {
    if (!applyTo.includes(context.uid)) {
      return next();
    }

    if (["create", "update"].includes(context.action)) {
      // @ts-expect-error how to type data?
      const fullName = `${context.params.data.firstName} ${context.params.data.lastName}`;

      // @ts-expect-error
      context.params.data.slug = fullName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-");
    }

    const result = await next();

    return result;
  });
};
