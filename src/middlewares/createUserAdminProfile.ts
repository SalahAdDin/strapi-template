/**
 * `createUserAdminProfile` middleware
 */

import type { Core } from "@strapi/strapi";

export default (_config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    await next();

    try {
      let data = ctx.response.body.data;

      await strapi.documents("api::profile.profile").create({
        data: {
          eMail: data.email,
          firstName: data.firstname,
          lastName: data.lastname,
          // @ts-expect-error Type 'any[]' is not assignable to type 'XOneInput'.
          user: [data.id],
          createdBy: data.id,
        },
      });
    } catch (error) {
      strapi.log.error("Unable to create admin profile: \n", error);
    }
  };
};
