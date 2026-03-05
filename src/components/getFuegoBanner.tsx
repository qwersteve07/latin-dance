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
        <div
            ref={appState.getFuegoBannerRef}
            className="w-ful px-6 py-2 font-bold cursor-pointer border-b border-b-border-main flex justify-between items-center backdrop-blur-xl hover:bg-background-fourth transition"
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
    );
};

export default GetFuegoBanner;
