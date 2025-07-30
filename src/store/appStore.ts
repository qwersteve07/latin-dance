import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface AppStore {
  currentCity: string;
  setCurrentCity: (city: string) => void;
  installBannerHide: boolean;
  setInstallBannerHide: () => void;
  getFuegoBannerHide: boolean;
  setGetFuegoBannerHide: () => void;
}

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      set => ({
        currentCity: "taipei",
        setCurrentCity: (city: string) => set(() => ({ currentCity: city })),
        installBannerHide: false,
        setInstallBannerHide: () => set(() => ({ installBannerHide: true })),
        getFuegoBannerHide: false,
        setGetFuegoBannerHide: () => set(() => ({ getFuegoBannerHide: true })),
      }),
      {
        name: "appStore",
      }
    )
  )
);
