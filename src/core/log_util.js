export const SystemLogTypes = {
    INIT: "INIT", // App/HQ initialization
    START: "START", // App/module start
    CLOSE: "CLOSE", // App/module close
    LOAD: "LOAD", // Data load
    SAVE: "SAVE", // Data save
    UPDATE: "UPDATE", // Data/settings update
    ERROR: "ERROR", // Error/exception
    PWA: "PWA", // PWA events (ServiceWorker, offline)
    SYNC: "SYNC", // Sync or network events
    ACTION: "ACTION", // User actions (HQ interactions)
};

export const SystemLogMessages = {
    [SystemLogTypes.INIT]: "System initialized",
    [SystemLogTypes.START]: "Module started",
    [SystemLogTypes.CLOSE]: "Module closed",
    [SystemLogTypes.LOAD]: "Data loaded successfully",
    [SystemLogTypes.SAVE]: "Data saved successfully",
    [SystemLogTypes.UPDATE]: "Data/settings updated",
    [SystemLogTypes.ERROR]: "An error occurred",
    [SystemLogTypes.PWA]: "PWA event occurred",
    [SystemLogTypes.SYNC]: "Sync operation performed",
    [SystemLogTypes.ACTION]: "User action performed",
    UNRECOGNISED: "Unknown log type",
};

export const createLog = (type, message) => {
    return {
        Date: new Date().toISOString(),
        type: type ?? "UNRECOGNISED",
        additional_message: message,
    };
};
