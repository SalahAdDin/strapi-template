import { Core } from "@strapi/strapi";

export default ({ strapi }: { strapi: Core.Strapi }) => {
  const adminRoutes = strapi.admin.routes.admin.routes;

  const routeConfigs = [
    {
      path: "/users",
      method: "POST",
      middleware: "global::createUserAdminProfile",
    },
    {
      path: "/users/batch-delete",
      method: "POST",
      middleware: "global::deleteUserAdminProfile",
    },
  ];

  routeConfigs.forEach(({ path, method, middleware }) => {
    const routeIndex = adminRoutes.findIndex(
      (route) => route.path === path && route.method === method,
    );

    if (routeIndex !== -1) {
      const route = adminRoutes[routeIndex];

      route.config.middlewares = route.config.middlewares || [];

      if (!route.config.middlewares.includes(middleware)) {
        route.config.middlewares.push(middleware);
      }
    }
  });
};
