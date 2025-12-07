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
        if (this.isCompositing) return;
        if (keyCode === "Enter") {
            e.preventDefault();
            const selection = window.getSelection();
            if (!selection || selection.rangeCount === 0) {
                return setTimeout(() => this.onKeydown(e), 0);
            }
            const range = selection.getRangeAt(0);
            const br = document.createTextNode("\n");
            range.insertNode(br);
            const newRange = document.createRange();
            newRange.setStartAfter(br);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
        }
    }

    onCompositionStart() {
        console.log(true)
        this.isCompositing = true;
    }

    onCompositionEnd() {
        console.log(false) ;
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
        this.editorArea.focus();
    }
}
