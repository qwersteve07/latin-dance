import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useAppStore } from "@/store/appStore";
import { useEffect, useState } from "react";
import { useAppState } from "@/store/appState";

const GetFuegoBanner = () => {
    const appStore = useAppStore()
    const appState = useAppState()
    const [bannerHide, setBannerHide] = useState(true)
    const { t } = useTranslation("common");

    useEffect(() => {
        setBannerHide(appStore.getFuegoBannerHide)
    }, [appStore.getFuegoBannerHide])

    if (bannerHide) return <></>;

    return (
        <div className="w-full py-3 border-b border-b-border-main backdrop-blur-xl hover:bg-background-fourth transition">
            <div
                ref={appState.getFuegoBannerRef}
                className="text-xs container mx-auto max-w-6xl px-6 font-bold cursor-pointer flex justify-between items-center backdrop-blur-xl"
                onClick={() => window.open('https://bit.ly/45UHTlP')}
            >
                {t("get_fuego")}
                <span
                    onClick={(e) => {
                        e.stopPropagation();
                        appStore.setGetFuegoBannerHide()
                        setBannerHide(true)
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

export default GetFuegoBanner;
