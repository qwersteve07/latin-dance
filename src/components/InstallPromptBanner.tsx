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
        <>
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
                className="w-full bg-red-500 text-white font-bold text-center cursor-pointer"
                onClick={open}
            >
                <div className="container px-6 py-2 mx-auto max-w-6xl relative flex items-center justify-center max-md:justify-between max-md:py-0">
                    {t("a2hs.announce")}
                    <span
                        className="absolute right-8 max-md:static top-0 w-10 h-10 flex justify-center items-center"
                        onClick={e => {
                            e.stopPropagation();
                            hideInstallBanner();
                        }}
                    >
                        <Image
                            className="-mr-1.5"
                            src="/icon-cross.svg"
                            alt="cross"
                            width="20"
                            height="20"
                        />
                    </span>
                </div>
            </div>
        </>
    );
};

export default InstallPromptBanner;
