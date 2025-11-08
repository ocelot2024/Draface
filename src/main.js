import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/base.css";
import { getBrowserLang, loadTranslations } from "./core/lang-utils";
import { Translated } from "./store/translate";
import { initAppData } from "./core/store";

const init = async () => {
    await loadTranslations(getBrowserLang());
    initAppData();
    document.title = Translated.data.brand.normal;
    const app = createApp(App);
    app.use(router);
    app.mount("#app");
    if (__BRANCH__ == "deploy") {
        document.body.insertAdjacentHTML(
            "beforeend",
            `<!-- Google tag (gtag.js) -->
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-G07C5V6Z5Z">
                </script>
                <script>
                    window.dataLayer = window.dataLayer || [];
                    function gtag() {
                        dataLayer.push(arguments);
                    }
                    gtag("js", new Date());
                    gtag("config", "G-G07C5V6Z5Z");
                </script>
            `
        );
    }
};

window.addEventListener("load", init);
