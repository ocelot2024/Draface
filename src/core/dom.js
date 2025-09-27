export const getElementPos = (dom) => {
    const domRect = dom.getBoundingClientRect();
    return {
        left: domRect.left,
        right: domRect.right,
        top: domRect.top,
    };
};
