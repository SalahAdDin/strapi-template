/**
 * post router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::post.post", {
  config: {
    find: {
      middlewares: ["api::post.populate-post-author"],
    },
    findOne: {
      middlewares: ["api::post.populate-post-author"],
    },
  },
});
