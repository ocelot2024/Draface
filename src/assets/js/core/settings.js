import { lang } from "./translations";
import { EDITOR_SETTINGS_VALUE } from "@/apps/edit/assets/data";
import { isRef } from "vue";

export let AppGlobalSettings = {
    global: {
        langage: lang,
        appname: "Neffice",
    },
    apps: {
        Editor: {
            indent_char: EDITOR_SETTINGS_VALUE.indent_char.Space,
            space_len: EDITOR_SETTINGS_VALUE.indent_length.four,
        },
        HQ: {
            recent_apps: [],
        },
    },
};

const deepMerge = (target, source) => {
    for (const key in source) {
        if (
            source[key] &&
            typeof source[key] === "object" &&
            !Array.isArray(source[key])
        ) {
            if (!target[key]) target[key] = {};
            deepMerge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
};

export const save_settings = () => {
    let clone = AppGlobalSettings;
    clone.global.langage = AppGlobalSettings.global.langage.value;
    const json = JSON.stringify(clone);
    localStorage.setItem("AppSettings", json);
};

export const load_settings = () => {
    const item = localStorage.getItem("AppSettings");
    if (item) {
        const json = JSON.parse(item);
        if (json.global && json.global.langage !== undefined) {
            if (isRef(AppGlobalSettings.global.langage)) {
                AppGlobalSettings.global.langage.value = json.global.langage;
            } else {
                AppGlobalSettings.global.langage = json.global.langage;
            }
            delete json.global.langage;
        }
        json.apps.HQ.recent_apps = json.apps.HQ.recent_apps.filter(function (
            x
        ) {
            return !(x === null || x === undefined || x === "");
        });
        deepMerge(AppGlobalSettings, json);
    }
};
