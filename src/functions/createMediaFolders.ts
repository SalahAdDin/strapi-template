import { Core } from "@strapi/strapi";

const paths = [
  "posts/hero/images",
  "posts/hero/videos",
  "posts/content/audios",
  "posts/content/files",
  "posts/content/images",
  "posts/content/videos",
  "profiles/photos",
];

const createFoldersRecursively = async (path: string, strapi: Core.Strapi) => {
  const parts = path.split("/");
  let parent = null;

  for (const part of parts) {
    const pathName = `${parent?.name ?? ""}/${part}`;

    const existingFolder = await strapi
      .documents("plugin::upload.folder")
      .findMany({
        filters: {
          name: part,
          parent: parent?.id ?? null,
        },
      });

    if (existingFolder.length === 0) {
      const folder = await strapi
        .plugin("upload")
        .service("folder")
        .create({
          name: part,
          parent: parent ? parent.id : null,
        });

      console.log(`Folder '${pathName}' created successfully.`);

      parent = folder;
    } else {
      console.log(`Folder '${pathName}' already exists.`);

      parent = Array.isArray(existingFolder)
        ? existingFolder.pop()
        : existingFolder;
    }
  }
};

export const createMediaFolders = async (strapi: Core.Strapi) => {
  console.info("\nCreating media folders based on given paths.\n");

  try {
    for (const path of paths) {
      await createFoldersRecursively(path, strapi);
    }
  } catch (error) {
    console.error("Error creating folder in Strapi media library:\n", error);
  } finally {
    console.info("\nMedia folders have been set up!");
  }
};
