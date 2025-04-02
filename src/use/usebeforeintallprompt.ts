import { useAppStore } from "@/store/appStore";
import { useEffect, useRef, useState } from "react";

export function useBeforeInstallPrompt() {
  const appStore = useAppStore();
  const deferredPrompt = useRef<any>(null);
  const [installBannerShow, setInstallBannerShow] = useState(false);

  useEffect(() => {
    if (appStore.installBannerHide) {
      return hideInstallBanner();
    }

    window.addEventListener("appinstalled", hideInstallBanner);
    window.addEventListener("beforeinstallprompt", showInstallBanner);

    return () => {
      window.removeEventListener("appinstalled", hideInstallBanner);
      window.removeEventListener("beforeinstallprompt", showInstallBanner);
    };
  }, [appStore.installBannerHide]);

  function showInstallBanner(e:any) {
    e.preventDefault();
    deferredPrompt.current = e;
    setInstallBannerShow(true);
  }

  function hideInstallBanner() {
    appStore.setInstallBannerHide();
    setInstallBannerShow(false);
    deferredPrompt.current = null;
  }

  return { installBannerShow, hideInstallBanner, deferredPrompt };
}
