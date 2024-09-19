import path from "path";
import { mergeConfig, type UserConfig } from "vite";

export default (config: UserConfig) => {
  // Important: always return the modified config
  return mergeConfig(config, {
    resolve: {
      alias: {
        "@functions": path.resolve(__dirname, "functions"),
        "@translations": path.resolve(__dirname, "translations"),
      },
    },
  });
};
