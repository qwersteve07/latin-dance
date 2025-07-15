import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useAppStore } from "@/store/appStore";

const GetFuegoBanner = () => {
    const appStore = useAppStore()
    const { t } = useTranslation("common");

    if (appStore.getFuegoBannerHide) return <></>;

    return (
        <>
            <div
                className="w-full bg-yellow-500 text-white font-bold text-center cursor-pointer"
                onClick={() => window.open('https://bit.ly/45UHTlP')}
            >
                <div className="container px-6 h-10 mx-auto max-w-6xl relative flex items-center justify-center max-md:justify-between">
                    {t("get_fuego")}
                    <span
                        className="absolute right-8 max-md:static top-0 w-10 h-10 flex justify-center items-center"
                        onClick={(e) => {
                            e.stopPropagation();
                            appStore.setGetFuegoBannerHide()
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

export default GetFuegoBanner;
