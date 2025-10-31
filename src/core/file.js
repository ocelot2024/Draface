/**
 *
 * @param {Array} accept - ['.txt', '.md']
 * @param {Boolean} multiple
 */
export const pickFile = (accept = ["*"], multiple = false) => {
    const tag = document.createElement("input");
    tag.setAttribute("type", "file");
    tag.setAttribute("accept", accept.join(","));
    if (multiple) tag.multiple = true;
    tag.click();
};

export const createFile = (data, mime = "text/plain") => {
    const blob = new Blob([data], { type: mime });
    const url = URL.createObjectURL(blob);
    return {
        fileURL: url,
        discardURL: () => URL.revokeObjectURL(url),
    };
};
