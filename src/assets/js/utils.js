export const generateID = () => {
    return (
        crypto.randomUUID?.() ||
        ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
            (
                c ^
                (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
            ).toString(16)
        )
    );
};
export const isSmartPhone = () => {
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
        return true;
    } else {
        return false;
    }
};

export const getElemPos = (target) => {
    if (!target) throw new Error("Unable to find the target");
    const rect = target.getBoundingClientRect();
    const viewportLeft = rect.left + target.clientLeft;
    const viewportTop = rect.top + target.clientTop;
    return { viewportLeft, viewportTop };
};

export const getThreads = () => {
    return Math.max(navigator.hardwareConcurrency ?? 2, 1);
};
