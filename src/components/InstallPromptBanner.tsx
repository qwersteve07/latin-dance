import Image from "next/image";
import InstallModal from "./installModal";
import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { useBeforeInstallPrompt } from "@/use/usebeforeintallprompt";
import { useAppState } from "@/store/appState";

const InstallPromptBanner = () => {
    const appState = useAppState()
    const { installBannerShow, deferredPrompt, hideInstallBanner } =
        useBeforeInstallPrompt();

    const [opened, { open, close }] = useDisclosure(false);
    const { t } = useTranslation("common");

    async function installAppToHomeScreen() {
        deferredPrompt.current.prompt();
        const { outcome } = await deferredPrompt.current.userChoice;
        if (outcome !== "dismissed") {
            hideInstallBanner();
        }
    }

    if (!installBannerShow) return <></>;

    return (
        <div>
            <InstallModal
                opened={opened}
                onConfirm={installAppToHomeScreen}
                onCancel={() => {
                    close();
                    hideInstallBanner();
                }}
                onClose={close}
            />
            <div
                ref={appState.installPromptBannerRef}
                className="w-full px-6 py-2 font-bold border-b border-b-border-main cursor-pointer flex justify-between items-center backdrop-blur-xl hover:bg-background-fourth transition"
                onClick={open}
            >
                {t("a2hs.announce")}
                <span
                    onClick={e => {
                        e.stopPropagation();
                        hideInstallBanner();
                    }}
                >
                    <Image
                        src="/icon-cross.svg"
                        alt="cross"
                        width="20"
                        height="20"
                    />
                </span>
            </div>
        </div>
    );
};

export default InstallPromptBanner;
