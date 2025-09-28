import AppLoader from "@/apps/app-loader.vue";
import Hq from "@/hq/hq.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: Hq,
            children: [
                {
                    path: "",
                    component: Hq,
                    name: "root",
                },
                {
                    path: "app/:id",
                    components: { app: AppLoader },
                },
            ],
        },
    ],
});

export default router;
