export default ({ env }) => ({
  "preview-button": {
    config: {
      contentTypes: [
        {
          uid: "api::category.category",
          draft: {
            url: `${env("PREVIEW_URL")}/api/preview`,
            query: {
              type: "category",
              locale: "{locale}",
              slug: "{slug}",
            },
            openTarget: "_blank",
          },
          published: {
            url: `${env("PREVIEW_URL")}/{locale}/category/{slug}`,
            openTarget: "_blank",
          },
        },
        {
          uid: "api::post.post",
          draft: {
            url: `${env("PREVIEW_URL")}/api/preview`,
            query: {
              type: "post",
              locale: "{locale}",
              slug: "{slug}",
            },
            openTarget: "_blank",
          },
          published: {
            url: `${env("PREVIEW_URL")}/{locale}/post/{slug}`,
            openTarget: "_blank",
          },
        },
        {
          uid: "api::profile.profile",
          draft: {
            url: `${env("PREVIEW_URL")}/api/preview`,
            query: {
              type: "profile",
              locale: "{locale}",
              slug: "{slug}",
            },
            openTarget: "_blank",
          },
          published: {
            url: `${env("PREVIEW_URL")}/{locale}/profile/{slug}`,
            openTarget: "_blank",
          },
        },
      ],
    },
  },
  navigation: {
    enabled: true,
  },
  seo: {
    enabled: true,
  },
  /*
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
  webtools: {
    enabled: true,
  },
  */
});
