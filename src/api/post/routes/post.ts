/**
 * post router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::post.post", {
  config: {
    find: {
      middlewares: ["api::post.populate-author-slug"],
    },
    findOne: {
      middlewares: ["api::post.populate-author-slug"],
    },
  },
});
