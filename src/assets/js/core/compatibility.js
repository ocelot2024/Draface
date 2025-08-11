import { isSmartPhone } from "../utils";

export const browserChkFeatures = () => {
    return {
        file: "showOpenFilePicker" in window,
        smartPhone: !isSmartPhone(),
    };
};
