import { BaseFile, get_mime, pickFile } from "@/assets/js/core/file";
import { app_name } from "./data";
import { reactive, ref } from "vue";

const extractFilename = (filename) => {
    const index = filename.lastIndexOf(".");
    return index !== -1 ? filename.substring(0, index) : filename;
};

const extractExtension = (filename) => {
    const index = filename.lastIndexOf(".");
    return index !== -1 ? filename.substring(index + 1) : "";
};

export const openAppFile = async (inst) => {
    const file = await pickFile();
    try {
        const json = JSON.parse(file.data);
        if (app_name.short in json) {
            const instance = new EditAppFile(extractFilename(file.filename));
            Object.assign(instance.data, json);
            Object.assign(inst, instance);
            return instance;
        }
    } catch (_error) {}
    const instance = new PlainTextFile(file.filename);
    instance.data.value = file.data;
    Object.assign(inst, instance);
    return instance;
};

export class EditAppFile extends BaseFile {
    constructor(filename) {
        super(filename);
        this.extension = "nfe";
        this.created_application = app_name.short;
        this.data = reactive({ content: "" });
    }
}

export class PlainTextFile extends BaseFile {
    constructor(filename) {
        super(filename);
        this.extension = extractExtension(filename);
        this.created_application = "UNKNOWN";
        this.data = ref("");
    }
    async to_blob() {
        return new Blob([this.data]);
    }
    get_mime() {
        return get_mime(this.extension);
    }
}
