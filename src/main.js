import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/base.css";
import { getBrowserLang, loadTranslations } from "./core/lang-utils";
import { Translated } from "./store/translate";

const init = async () => {
    await loadTranslations(getBrowserLang());
    document.title = Translated.data.brand.normal;
    const app = createApp(App);
    app.use(router);
    app.mount("#app");
};

window.addEventListener("load", init);
