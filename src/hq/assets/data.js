import { defineApps, definePanelItem } from "./core";
import editLogo from "../../apps/edit/assets/img/logo.svg";
export default {
    apps: [defineApps("Edit", editLogo, "/edit")],
};

export const menuItems = [
    definePanelItem("home", "ホーム", "home"),
    definePanelItem("apps", "アプリ", "apps"),
    definePanelItem("power_settings_new", "作成", "start_with_new"),
];
