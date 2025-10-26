import { createFile } from "@/core/file";
import { Translated } from "@/store/translate";
import { reactive } from "vue";

export class Editor {
    constructor() {
        this.filename = Translated.data.edit.file.default_name ?? "no_name";
        this.extension = "txt";
        this.data = reactive([""]);
        this.lineLength = reactive([0]);
        this.historyStack = [];
        this.historyCounter = 0;
        this._prefixSum = [0];
        this.carretPos = reactive({ line: 0, pos: 0 });
    }
    onChange(value) {
        if (typeof value !== "string") return;
        const newLines = value.replace(/\r\n/g, "\n").split("\n");
        const oldLines = this.data;
        const lengths = this.lineLength;
        const minLen = Math.min(oldLines.length, newLines.length);

        for (let i = 0; i < minLen; i++) {
            if (oldLines[i] !== newLines[i]) {
                oldLines[i] = newLines[i];
                lengths[i] = newLines[i].length;
            }
        }

        if (newLines.length > oldLines.length) {
            const addedLines = newLines.slice(oldLines.length);
            oldLines.push(...addedLines);
            lengths.push(...addedLines.map((line) => line.length));
        } else if (newLines.length < oldLines.length) {
            oldLines.splice(newLines.length);
            lengths.splice(newLines.length);
        }
        this._updatePrefixSum();
    }
    _updatePrefixSum() {
        const result = [];
        let total = 0;
        for (let i = 0; i < this.lineLength.length; i++) {
            total += this.lineLength[i] + 1;
            result.push(total);
        }
        this._prefixSum = result;
    }
    updateCursor(text_area) {
        if (!text_area?.value) return;
        const endPos = text_area.selectionEnd ?? 0;
        const lineIndex = this._binarySearchPrefix(endPos);
        const col =
            endPos - (lineIndex > 0 ? this._prefixSum[lineIndex - 1] : 0);
        this.carretPos.line = lineIndex;
        this.carretPos.pos = col;
        console.log(this.carretPos);
    }
    _binarySearchPrefix(pos) {
        const arr = this._prefixSum;
        let low = 0,
            high = arr.length - 1,
            mid;
        while (low <= high) {
            mid = (low + high) >> 1;
            if (pos < arr[mid]) high = mid - 1;
            else low = mid + 1;
        }
        return low;
    }
    save_to_local() {
        const file = createFile(this.data.join("\n"));
        const a = document.createElement("a");
        a.href = file.fileURL;
        a.download = `${this.filename}.${this.extension}`;
        a.click();
        file.discardURL();
    }
}
