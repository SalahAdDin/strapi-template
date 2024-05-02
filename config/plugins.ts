export default ({ env }) => ({
  navigation: {
    enabled: true,
    config: {
      allowedLevels: 2,
      contentTypes: ["api::post.post"],
      contentTypesNameFields: {
        "api::post.post": ["title"],
      },
      excludedContentTypes: ["plugins::", "strapi"],
      pathDefaultFields: {
        "api::post.post": ["slug"],
      },
    },
  },
  "preview-button": {
    config: {
      contentTypes: [
        {
          uid: "api::post.post",
          draft: {
            url: `${env("PUBLIC_DOMAIN_URL")}/api/preview`,
            query: {
              type: "post",
              locale: "{locale}",
              slug: "{slug}",
              secret: env("STRAPI_PREVIEW_SECRET", ""),
            },
            openTarget: "_blank",
          },
          published: {
            // can add extra segment, like "blog", when required
            url: `${env("PUBLIC_DOMAIN_URL")}/{locale}/{slug}`,
            openTarget: "_blank",
          },
        },
      ],
    },
  },
  seo: {
    enabled: true,
  },
  sitemap: {
    enabled: true,
    config: {
      cron: "* * * * 7",
      xsl: true,
      autoGenerate: false,
      caching: true,
    },
  },
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        uploadStream: { folder: env("CLOUDINARY_FOLDER") },
        delete: {},
      },
    },
  },
});
