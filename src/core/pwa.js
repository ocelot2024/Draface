import { ref } from "vue";

export const installPrompt = ref(null);
export const checkIsInstalled = () =>
    window.matchMedia("(display-mode: standalone)").matches;

export const registerInstallPrompt = () => {
    window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        installPrompt.value = event;
    });
};
export const showInstallPrompt = async () => {
    if (!installPrompt.value) {
        console.warn("No install prompt available yet.");
        return;
    }
    installPrompt.value.prompt();
    const choiceResult = await installPrompt.value.userChoice;
    installPrompt.value = null;
    return choiceResult;
};
