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
