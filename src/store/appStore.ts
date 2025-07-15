import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { organizerTaipeiList } from "@/const/organizers-taipei";
import { organizerTaichungList } from "@/const/organizers-taichung";
import { organizerKaohsiungList } from "@/const/organizers-kaohsiung";
import { Organizer } from "@/types/organizer";
import { organizerTainanList } from "@/const/organizers-tainan";

export const organizerList: Array<Organizer> = [
  ...organizerTaipeiList,
  ...organizerTaichungList,
  ...organizerTainanList,
  ...organizerKaohsiungList,
];

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
