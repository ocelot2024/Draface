export const DefineMenu = (label, items) => {
    return {
        label: label,
        items: items,
    };
};

export const DefineMenuItem = (label, command, separate) => {
    return {
        label: label,
        command: command,
        bind: {
            separate: separate,
        },
    };
};
