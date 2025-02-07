/**
 * `populatePostAuthor` middleware
 */

import type { Core } from "@strapi/strapi";

export default (_config, { strapi }: { strapi: Core.Strapi }) => {
  const processPost = async (post) => {
    if (post && post.createdBy) {
      const creatorId = post.createdBy.id;
      const updaterId = post.updatedBy.id;

      const [creatorProfile, updaterProfile] = await Promise.all([
        strapi.documents("api::profile.profile").findFirst({
          filters: {
            user: {
              id: creatorId,
            },
          },
          select: ["slug"],
        }),
        strapi.documents("api::profile.profile").findFirst({
          filters: {
            user: {
              id: updaterId,
            },
          },
          select: ["slug"],
        }),
      ]);

      if (creatorProfile) {
        post.createdBy.slug = creatorProfile.slug;
      }

      if (updaterProfile) {
        post.updatedBy.slug = updaterProfile.slug;
      }
    }
  };

  return async (ctx, next) => {
    if (!ctx.query.populate) {
      ctx.query.populate = ["createdBy", "updatedBy"];
    }

    await next();

    if (ctx.response.body && ctx.response.body.data) {
      const responseData = ctx.response.body.data;

      if (Array.isArray(responseData)) {
        await Promise.all(responseData.map(processPost));
      } else {
        await processPost(responseData);
      }
    }
  };
};
