// import { Core } from "@strapi/strapi";

const paths = [
  "posts/hero/images",
  "posts/hero/videos",
  "posts/content/audios",
  "posts/content/files",
  "posts/content/images",
  "posts/content/videos",
  "profiles/photos",
];

const createFoldersRecursively = async (path: string, strapi) => {
  const parts = path.split("/");
  let parent = null;

  for (const part of parts) {
    const pathName = `${parent?.name ?? ""}/${part}`;

    try {
      const existingFolder = await strapi.entityService.findMany(
        "plugin::upload.folder",
        {
          filters: {
            name: part,
            parent: parent?.id ?? null,
          },
        }
      );

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
    } catch (error) {
      console.error(
        `Error creating folder ${pathName} in Strapi media library:\n`,
        error
      );
    }
  }
};

export const createMediaFolders = async (strapi) => {
  console.info("\nCreating media folders based on given paths.\n");

  for (const path of paths) {
    await createFoldersRecursively(path, strapi);
  }

  console.info("\nMedia folders have been set up!");
};
