import {
    AppGlobalSettings,
    load_settings,
    save_settings,
} from "@/assets/js/core/settings";

export const defineApps = (appname, iconURL, appURL) => {
    return { appname: appname, iconURL: iconURL, appURL: appURL };
};
export const definePanelItem = (icon, label, item_id) => {
    return { icon, label, item_id };
};
export const addRecentApps = (app_prop) => {
    AppGlobalSettings.apps.HQ.recent_apps.push(app_prop);
    console.log(AppGlobalSettings);
    save_settings();
};

export const getRecentApps = () => {
    load_settings();
    const apps = AppGlobalSettings.apps.HQ.recent_apps;
    return Array.from(
        new Map(apps.map((app) => [app.name, app])).values()
    ).reverse();
};
