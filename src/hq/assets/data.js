import { defineApps } from "./core";
import editLogo from "../../apps/edit/assets/img/logo.svg";
export default {
    apps: [defineApps("Edit", editLogo, "/edit")],
};
