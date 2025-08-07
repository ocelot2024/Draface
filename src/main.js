import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/main.css";
import data from "./assets/data";
import { browserChkFeatures } from "./assets/js/core/compatibility";
import { SysStatus } from "./assets/js/core/states";
import { waitUntilLoadTranslatedDatas } from "./assets/js/core/translations";
import { AppGlobalSettings, load_settings } from "./assets/js/core/settings";

const init = async () => {
    AppGlobalSettings.global.langage.value = "ja-jp";
    load_settings();
    await waitUntilLoadTranslatedDatas();
    SysStatus.browserFeatureSupport = browserChkFeatures();
    console.log(SysStatus);
    document.title = data.appName;
    const app = createApp(App);
    app.use(router);
    app.mount("#app");
};

window.addEventListener("load", init);
