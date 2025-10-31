import { createLog, SystemLogTypes } from "./log_util";

const defaultAppData = {
    HQ: {
        AppHistory: [],
    },
    App: {
        log: [],
    },
};

const readAppDataFromLocalStorage = () => {
    try {
        const rawData = localStorage.getItem("appData");
        if (!rawData) return structuredClone(defaultAppData);
        let parsed = JSON.parse(rawData);
        return parsed ?? structuredClone(defaultAppData);
    } catch (e) {
        let log = structuredClone(defaultAppData);
        log.App.log.push(
            createLog(SystemLogTypes.ERROR, "Failed to parse App Data")
        );
        localStorage.setItem("appData", JSON.stringify(log));
        return log;
    }
};

export class AppStorage {
    constructor() {
        this.data = readAppDataFromLocalStorage();
        this.log(SystemLogTypes.INIT);
    }
    log(type, value) {
        this.data.App.log.push(createLog(type, value));
        this.save();
    }
    save() {
        this.data.App.log.push(
            createLog(SystemLogTypes.SAVE, "App data saved.")
        );
        const json = JSON.stringify(this.data);
        localStorage.setItem("appData", json);
    }
    setNewData(key, value, options = { merge: true }) {
        const keys = key.split(".");
        let target = this.data;

        for (let i = 0; i < keys.length - 1; i++) {
            const k = keys[i];
            if (!target[k]) target[k] = {};
            target = target[k];
        }

        const lastKey = keys[keys.length - 1];

        if (
            options.merge &&
            typeof target[lastKey] === "object" &&
            !Array.isArray(target[lastKey])
        ) {
            target[lastKey] = { ...target[lastKey], ...value };
        } else {
            target[lastKey] = value;
        }

        this.data.App.log.push(
            createLog(
                SystemLogTypes.UPDATE,
                `Updated "${key}" with "${JSON.stringify(value)}"`
            )
        );
        this.save();
    }
}
