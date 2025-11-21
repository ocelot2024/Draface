export default class Editor {
    constructor() {
        this.data = "";
        this.editorArea = "";
        this.isCompositing = false;

        this.onKeydown = this.onKeydown.bind(this);
        this.onCompositionStart = this.onCompositionStart.bind(this);
        this.onCompositionEnd = this.onCompositionEnd.bind(this);
    }
    onKeydown(e) {
        const keyCode = e.code;
        const key = e.key;
        const value = this.editorArea.value.innerText;
        if (keyCode == "Enter" && !this.isCompositing) {
            e.preventDefault();
            const selection = window.getSelection();
            const range = selection.getRangeAt(0).endOffset;
            this.editorArea.value.innerText =
                value.substring(0, range) + "\n" + value.substring(range);
        }
    }
    onCompositionStart() {
        this.isCompositing = true;
    }
    onCompositionEnd() {
        this.isCompositing = false;
    }
    setupEditor() {
        this.editorArea.value.addEventListener("keydown", this.onKeydown);
        this.editorArea.value.addEventListener(
            "compositionstart",
            this.onCompositionStart
        );
        this.editorArea.value.addEventListener(
            "compositionend",
            this.onCompositionEnd
        );
    }
}
