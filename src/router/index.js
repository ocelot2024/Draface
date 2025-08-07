import { createRouter, createWebHistory } from "vue-router";
import hq from "@/hq/hq.vue";
import AppLoader from "@/apps/app-loader.vue";
import data from "@/assets/data";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: hq,
        },
        {
            path: "/:id",
            name: "app",
            components: {
                default: hq,
                app: AppLoader,
            },
        },
    ],
});

router.beforeEach((to, _from, next) => {
    next();
    document.querySelector("#favicon").href = `/${to.params.id}.svg`;
    document.title = `${data.appName} ${to.params.id ? data.apps.names[to.params.id] : ""}`;
});
export default router;
