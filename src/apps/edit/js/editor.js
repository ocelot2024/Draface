import { Translated } from "@/store/translate";
import { reactive } from "vue";

export class Editor {
    constructor() {
        this.filename = Translated.data.edit.file.default_name ?? "no_name";
        this.extension = "txt";
        this.data = reactive([""]);
        this.historyStack = [];
        this.historyCounter = 0;
    }
    onChange(value, lines) {
        const newLines = value.split("\n");
        const oldLines = this.data;
        const minLen = Math.min(oldLines.length, newLines.length);

        for (let i = 0; i < minLen; i++) {
            if (oldLines[i] !== newLines[i]) oldLines[i] = newLines[i];
        }

        if (newLines.length > oldLines.length)
            oldLines.push(...newLines.slice(oldLines.length));
        else if (newLines.length < oldLines.length)
            oldLines.splice(newLines.length);
    }
}
