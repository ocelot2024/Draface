const defineSettingsItem = (id, _icon) => {
    return { id };
};
export const PrefItems = [
    [
        {
            name: "general",
            children: [defineSettingsItem("clearAllDatas")],
        },
        {
            name: "aboutAndThanks",
            children: [
                defineSettingsItem("about"),
                defineSettingsItem("OSSLicenses"),
            ],
        },
    ],
    [
        {
            name: "privacy",
            children: [
                defineSettingsItem("enableLoggin"),
                defineSettingsItem("showLogs"),
            ],
        },
    ],
];
