import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { execSync } from "node:child_process";

const isDev = process.env.NODE_ENV !== "production";

const branch = isDev
    ? execSync("git rev-parse --abbrev-ref HEAD").toString().trim()
    : "deploy";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools()],
    base: "/Draface/",
    server: {
        host: true,
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    define: {
        __BRANCH__: JSON.stringify(branch),
    },
});
