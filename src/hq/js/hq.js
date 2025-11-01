import Button from "@/components/base/BaseButton.vue";
import SidePanelListContainer from "@/components/base/SidePanelListContainer.vue";
import SidePanelListItem from "@/components/base/SidePanelListItem.vue";
import SidePanelViewContainer from "@/components/layouts/SidePanelViewContainer.vue";
import {
    showInstallPrompt,
    registerInstallPrompt,
    installPrompt,
} from "@/core/pwa";
import { Translated } from "@/store/translate";
import {
    defineAsyncComponent,
    onMounted,
    onUnmounted,
    reactive,
    ref,
} from "vue";
import router from "@/router";
import { useRoute } from "vue-router";
import Modal from "@/components/overlay/Modal.vue";
import Spinner from "@/components/base/Spinner.vue";
export const useHQ = () => {
    const branch = __BRANCH__;
    const showAboutModal = ref(false);

    const sidePanelItems = [
        { id: "home", content: Translated.data.hq.navigation.to_home },
        { id: "to_recent", content: Translated.data.hq.navigation.to_recent },
    ];

    const viewSelector = ref(sidePanelItems[0].id);
    registerInstallPrompt();
    const appBox = reactive({
        top: "0px",
        left: "0px",
        right: "auto",
        bottom: "auto",
        width: "80px",
        height: "80px",
        transition: "none",
        shown: false,
        opacity: 0,
    });
    const showAppBox = () => {
        appBox.shown = true;
        appBox.top = "0px";
        appBox.left = "0px";
        appBox.right = "0px";
        appBox.bottom = "0px";
        appBox.width = "100%";
        appBox.height = "100%";
        appBox.opacity = 1;
    };
    const setAppView = (data) => {
        const pos = data[0];
        const appData = data[1];
        appBox.transition = "none";
        appBox.top = pos.top + "px";
        appBox.left = pos.left + "px";
        appBox.width = 80 + "px";
        appBox.height = 80 + "px";
        appBox.shown = true;
        appBox.opacity = 0;
        appBox.transition = "all 150ms cubic-bezier(1, 0.08, 0, 0.86)";
        setTimeout(() => {
            router.push("/app/" + appData.id);
            showAppBox();
        }, 100);
    };
    const isAppPage = (to) => {
        if (to.name == "root") appBox.shown = false;
        else showAppBox();
    };
    const removeGuard = router.beforeResolve(isAppPage);

    onUnmounted(() => removeGuard());
    onMounted(() => isAppPage(useRoute()));

    const HomeView = defineAsyncComponent({
        loader: () => import("../views/HomeView.vue"),
        loadingComponent: Spinner,
    });
    const AboutView = defineAsyncComponent({
        loader: () => import("../views/AboutView.vue"),
        loadingComponent: Spinner,
    });
    return {
        Button,
        SidePanelListContainer,
        SidePanelListItem,
        SidePanelViewContainer,
        showInstallPrompt,
        registerInstallPrompt,
        installPrompt,
        Translated,
        branch,
        showAboutModal,
        sidePanelItems,
        viewSelector,
        appBox,
        showAppBox,
        setAppView,
        isAppPage,
        HomeView,
        AboutView,
    };
};
