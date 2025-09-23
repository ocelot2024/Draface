import langs from "@/i18n/langs";
import { Translated } from "@/store/translate";

export const getBrowserLang = () =>
    (window.navigator.languages && window.navigator.languages[0]) ||
    window.navigator.language ||
    window.navigator.userLanguage ||
    window.navigator.browserLanguage;

export const loadTranslations = async (target_lang) => {
    let data;
    let lang = target_lang in langs ? target_lang : "ja-jp";
    data = await import(`../i18n/${lang}.js`);
    Translated.data = data.default;
    Translated.lang = lang;
    Translated.isLoaded = true;
};
