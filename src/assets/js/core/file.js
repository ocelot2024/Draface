import { ref } from "vue";

export const mime_types = {
    txt: "text/plain",
    json: "application/json",
    js: "application/javascript",
    jsx: "text/jsx",
    ts: "application/typescript",
    tsx: "text/tsx",
    html: "text/html",
    css: "text/css",
    csv: "text/csv",
    xml: "application/xml",
    md: "text/markdown",
    pdf: "application/pdf",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    bmp: "image/bmp",
    webp: "image/webp",
    svg: "image/svg+xml",
    mp3: "audio/mpeg",
    wav: "audio/wav",
    mp4: "video/mp4",
    mov: "video/quicktime",
    avi: "video/x-msvideo",
    zip: "application/zip",
    tar: "application/x-tar",
    gz: "application/gzip",
    rar: "application/vnd.rar",
    exe: "application/octet-stream",
    bin: "application/octet-stream",
};

export const get_mime = (exNoDot) => {
    if (!exNoDot) return "application/octet-stream";
    const ex = exNoDot.toLowerCase();
    return mime_types[ex] ?? "application/octet-stream";
};

export const dlFile = async (instance) => {
    const url = URL.createObjectURL(await instance.to_blob());
    const ln = document.createElement("a");
    ln.download = instance.get_filename();
    ln.href = url;
    ln.click();
    URL.revokeObjectURL(url);
};

export const pickFile = async () => {
    const [filePicker] = await window.showOpenFilePicker();
    const file = await filePicker.getFile();
    const text = await file.text();
    return await { data: text, filename: file.name };
};

export class BaseFile {
    constructor(filename) {
        this.filename = ref(filename);
        this.created_at = new Date();
        this.data = {};
        this.extension = "nf";
        this.created_application = "hq";
    }
    get_filename() {
        return this.filename + "." + this.extension;
    }
    async to_blob() {
        const original_data = JSON.stringify({
            filename: this.filename,
            created_at: this.created_at,
            data: this.data,
        });
        return new Blob([original_data], { type: this.get_mime() });
    }
    async from_blob(Blob) {
        const fileReader = new FileReader();
        return new Promise((resolve, reject) => {
            fileReader.onload = () => {
                try {
                    const parsed = JSON.parse(fileReader.result);
                    this.data = parsed.data;
                    this.filename = parsed.filename;
                    this.created_at = new Date(parsed.created_at);
                    resolve(parsed);
                } catch {
                    reject("failed parse a file.");
                }
            };
            fileReader.onerror = () => {
                reject(fileReader.error);
            };
            fileReader.readAsText(Blob);
        });
    }
    get_mime() {
        return "application/octet-stream";
    }
}
