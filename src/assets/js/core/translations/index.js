import { ref, watch } from "vue";

export const lang = ref(null);
export const translateData = ref(null);

watch(lang, async (newLang) => {
    if (["ja-jp"].includes(newLang)) {
        const module = await import(`./langs/${newLang}.js`);
        translateData.value = module.default;
    } else {
        console.warn(`Unsupported language: ${newLang}`);
    }
});

export const waitUntilLoadTranslatedDatas = () => {
    return new Promise((resolve) => {
        const checkLoaded = () => {
            if (lang.value && translateData.value && translateData.value.lang === lang.value) {
                resolve();
            } else {
                setTimeout(checkLoaded, 10);
            }
        };
        checkLoaded();
    });
};
