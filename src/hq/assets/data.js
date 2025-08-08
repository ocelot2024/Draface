import { defineApps } from "./core";
import editLogo from "../../apps/edit/assets/img/edit.svg";
export default {
    apps: [defineApps("Edit", editLogo, "/edit")],
};
