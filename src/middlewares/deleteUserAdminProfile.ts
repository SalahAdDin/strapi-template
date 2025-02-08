/**
 * `deleteUserAdminProfile` middleware
 */

import type { Core } from "@strapi/strapi";

export default (_config, { strapi }: { strapi: Core.Strapi }) => {
  const deleteProfile = async (userId: string) => {
    const profile = await strapi.db.query("api::profile.profile").findOne({
      where: { user: userId },
      select: ["documentId"],
    });

    await strapi.documents("api::profile.profile").delete({
      documentId: profile.documentId,
    });
  };

  return async (ctx, next) => {
    const ids = ctx.request.body.ids;

    try {
      const userIds = ids.map((id) => id);

      await Promise.all(userIds.map(deleteProfile));
    } catch (error) {
      strapi.log.error("Unable to delete admin profiles: \n", error);
    }

    await next();
  };
};
