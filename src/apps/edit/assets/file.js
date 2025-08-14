import { BaseFile, get_mime, pickFile } from "@/assets/js/core/file";
import { app_name, WorkerStatus } from "./data";
import { reactive, ref } from "vue";
import { getThreads } from "@/assets/js/utils";

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

const buildHashWorker = (line_per_thread_array, array) => {
    const data = [...array];
    const promises = [];
    for (let i = 0; i < line_per_thread_array.length; i++) {
        const data_for_worker = data.splice(0, line_per_thread_array[i]);
        const worker = new Worker(new URL("./worker.js", import.meta.url));
        const p = new Promise((resolve, reject) => {
            worker.onmessage = (e) => {
                resolve(e.data);
                worker.terminate();
                WorkerStatus.workers--;
            };
            worker.onerror = (err) => {
                reject(err);
                worker.terminate;
                WorkerStatus.workers--;
            };
        });
        WorkerStatus.workers++;
        worker.postMessage(data_for_worker);
        promises.push(p);
    }
    return Promise.all(promises);
};

export const detectDiff = async (old_one, new_one) => {
    if (WorkerStatus.CanIbuildHash) {
        WorkerStatus.CanIbuildHash = false;
        let result = [];
        for (let i = 0; i < 2; i++) {
            //old_oneとnew_oneそれぞれに対してワーカーを作るためのループ
            const target = i == 0 ? old_one : new_one;
            const len = target.length;
            const thread = getThreads();
            if (len > thread) {
                const line_per_thread = [
                    Math.floor(len / thread),
                    len % thread,
                ];
                let line_per_thread_array;
                if (line_per_thread[1] == 0) {
                    line_per_thread_array = new Array(thread).fill(
                        line_per_thread[0]
                    );
                } else {
                    line_per_thread_array = new Array(thread - 1).fill(
                        line_per_thread[0]
                    );
                    line_per_thread_array.push(
                        line_per_thread[0] + line_per_thread[1]
                    );
                }
                result.push(
                    await buildHashWorker(line_per_thread_array, target)
                );
            } else if (len == thread) {
                result.push(
                    await buildHashWorker(new Array(len).fill(1), target)
                );
            } else {
                result.push(await buildHashWorker([len], target));
            }
        }
        console.log(result);
        WorkerStatus.CanIbuildHash = true;
    }
};

export class EditBaseFile extends BaseFile {
    constructor(filename) {
        super(filename);
        this.history_stack = [];
        this.history_counter = -1;
        this.before_change_data = [];
    }
    onChange() {
        this.history_stack.push(this.before_change_data);
    }
}

export class EditAppFile extends EditBaseFile {
    constructor(filename) {
        super(filename);
        this.extension = "nfe";
        this.created_application = app_name.short;
        this.data = reactive({ content: "" });
    }
}

export class PlainTextFile extends EditBaseFile {
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
