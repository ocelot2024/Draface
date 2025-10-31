import { AppStorage } from "./strage";

export let AppData;
export const initAppData = () => (AppData = new AppStorage());
