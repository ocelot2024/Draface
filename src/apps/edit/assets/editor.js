import { nextTick } from "vue";
import { EDITOR_SETTINGS_VALUE, TAB_LEN } from "./data";
import { AppGlobalSettings } from "@/assets/js/core/settings";
export const handle_tab_enter = (e, editor, model, editor_lines) => {
    if (!["Enter", "Tab"].includes(e.key)) return;
    const el = editor.value;
    if (!el) return;
    const sentence = el.value;
    const cur = el.selectionStart;
    const before = sentence.slice(0, cur);
    const after = sentence.slice(cur);
    const tab = AppGlobalSettings.apps.Editor.indent_char == EDITOR_SETTINGS_VALUE.indent_char.Space ? " ".repeat(TAB_LEN[AppGlobalSettings.apps.Editor.space_len]) : "\t";
    if (e.key === "Tab") {
        e.preventDefault();
        model.value = before + tab + after;
        nextTick(() => (el.selectionStart = el.selectionEnd = cur + tab.length));
    } else if (e.key === "Enter") {
        e.preventDefault();
        const lines = before.split("\n");
        const last_line = lines[lines.length - 1];
        let indentStr = "";
        for (const ch of last_line) {
            if (ch === " " || ch === "\t") {
                indentStr += ch;
            } else {
                break;
            }
        }
        let insert = "\n";
        if (AppGlobalSettings.apps.Editor.indent_char === EDITOR_SETTINGS_VALUE.indent_char.Space) {
            const spaceCount = indentStr.split("").filter((c) => c === " ").length;
            const repeatCount = Math.floor(spaceCount / TAB_LEN[AppGlobalSettings.apps.Editor.space_len]);
            insert += tab.repeat(repeatCount);
        } else {
            const tabCount = indentStr.split("").filter((c) => c === "\t").length;
            insert += tab.repeat(tabCount);
        }
        const res = lines.join("\n") + insert;
        model.value = res + after;
        parseValue(e, editor, model, editor_lines);
        nextTick(() => (el.selectionStart = el.selectionEnd = res.length));
    }
};

let rafId;
export const parseValue = (_e, editor, model, lines) => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
        lines.value = editor.value.value.split("\n");
    });
};

export const updateCursor = (text_input, model, cursor) => {
    if (!text_input.value) return;
    requestAnimationFrame(() => {
        const pos = text_input.value.selectionStart;
        const beforeCursor = model.value.slice(0, pos);
        const line = beforeCursor.split("\n").length - 1;
        const column = beforeCursor.split("\n").pop().length;
        cursor.value = { line, column };
    });
};
