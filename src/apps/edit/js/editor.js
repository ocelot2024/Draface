export default class Editor {
    constructor() {
        this.data = "";
        this.editorArea = null;
        this.isCompositing = false;
        this.onKeydown = this.onKeydown.bind(this);
        this.onCompositionStart = this.onCompositionStart.bind(this);
        this.onCompositionEnd = this.onCompositionEnd.bind(this);
    }

    onKeydown(e) {
        const keyCode = e.code;
        const key = e.key;
        const value = this.editorArea.value || this.editorArea.innerText;

        if (keyCode === "Enter" && !this.isCompositing) {
            e.preventDefault();
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const position = range.endOffset;
            if (this.editorArea instanceof HTMLTextAreaElement) {
                this.editorArea.value =
                    value.substring(0, position) +
                    "\n" +
                    value.substring(position);
            } else {
                this.editorArea.innerText =
                    value.substring(0, position) +
                    "\n" +
                    value.substring(position);
            }
        }
    }

    onCompositionStart() {
        this.isCompositing = true;
    }

    onCompositionEnd() {
        this.isCompositing = false;
    }

    setupEditor(editorElement) {
        this.editorArea = editorElement;

        this.editorArea.addEventListener("keydown", this.onKeydown);
        this.editorArea.addEventListener(
            "compositionstart",
            this.onCompositionStart
        );
        this.editorArea.addEventListener(
            "compositionend",
            this.onCompositionEnd
        );
    }
}
