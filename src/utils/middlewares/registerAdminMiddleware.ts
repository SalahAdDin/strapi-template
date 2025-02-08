import { Core } from "@strapi/strapi";

export default ({ strapi }: { strapi: Core.Strapi }) => {
  const adminRoutes = strapi.admin.routes.admin.routes;

  const createAdminProfileMiddleware = "global::createUserAdminProfile";
  const deleteAdminProfileMiddleware = "global::deleteUserAdminProfile";

  // call the middleware when the user configure its password
  const postIndexID = adminRoutes.findIndex(
    (route) => route.path === "/users" && route.method === "POST",
  );

  // call the middleware when the user is deleted
  const deleteIndexID = adminRoutes.findIndex(
    (route) => route.path === "/users/batch-delete" && route.method === "POST",
  );

  if (postIndexID !== -1) {
    if (!adminRoutes[postIndexID].config.middlewares) {
      adminRoutes[postIndexID].config.middlewares = [
        createAdminProfileMiddleware,
      ];
    } else {
      adminRoutes[postIndexID].config.middlewares.push(
        createAdminProfileMiddleware,
      );
    }
  }

  if (deleteIndexID !== -1) {
    if (!adminRoutes[deleteIndexID].config.middlewares) {
      adminRoutes[deleteIndexID].config.middlewares = [
        deleteAdminProfileMiddleware,
      ];
    } else {
      adminRoutes[deleteIndexID].config.middlewares.push(
        deleteAdminProfileMiddleware,
      );
    }
  }
};
