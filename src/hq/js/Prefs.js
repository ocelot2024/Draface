import { getBrowserLang } from "@/core/lang-utils";
import { SystemLogTypes } from "@/core/log_util";
import { AppData } from "@/core/store";
import { Translated } from "@/store/translate";
import { reactive, unref } from "vue";

export const settingItemTypes = {
    toggle: 0,
    onlyLabel: 1,
    selector: 2,
    anyDefinedComponent: 3,
    actionButton: 4,
    toOther: 5,
};

/**
 *
 * @param {string} id
 * @param {Object} [config]
 * @param {string|null} [config.icon=null]
 * @param {number} [config.valueType=settingItemTypes.toggle]
 * @param {Object} [config.options={}]
 * @param {{ choices: string[] }} [config.options.selector]
 * @param {import('vue').Component} [config.options.component]
 * @param {{handler:Function, ask:Boolean, message:String}} [config.options.action]
 * @returns {{id: string, icon: string|null, valueType: number, options: Object}}
 */
const defineSettingsItem = (
    id,
    { icon = null, valueType = settingItemTypes.toggle, options = {} } = {}
) => {
    return { id, icon, valueType, options };
};

export const PrefItems = [
    [
        {
            name: "general",
            children: [
                defineSettingsItem("clearAllDatas", {
                    valueType: settingItemTypes.actionButton,
                    options: {
                        action: {
                            ask: true,
                            handler: () => AppData.clearData(),
                            message: "askClearData",
                        },
                    },
                }),
            ],
        },
        {
            name: "aboutAndThanks",
            children: [
                defineSettingsItem("about", {
                    valueType: settingItemTypes.anyDefinedComponent,
                }),
                defineSettingsItem("OSSLicenses", {
                    valueType: settingItemTypes.anyDefinedComponent,
                }),
            ],
        },
    ],
    [
        {
            name: "privacy",
            children: [
                defineSettingsItem("enableLogging", {
                    valueType: settingItemTypes.toggle,
                }),
                defineSettingsItem("showLogs", {
                    valueType: settingItemTypes.toOther,
                }),
            ],
        },
    ],
];

export const PrefValue = {
    theme: {
        Light: "light",
        dark: "dark",
        system_auto: "auto",
    },
};

export const defaultPref = {
    general: {
        lang: getBrowserLang(),
        theme: PrefValue.theme.Light,
    },
    privacy: {
        enableLogging: true,
    },
};

export class Preferences {
    constructor() {
        this.settings = reactive(AppData.Pref);
        this.PrefItems = PrefItems;
    }
    save() {
        AppData.log(SystemLogTypes.SAVE, "Saved Pref.");
        AppData.setNewData("Pref", unref(this.settings));
    }
}
