import { create } from "zustand";
import { organizerTaipeiList } from "@/const/organizers-taipei";
import { organizerTaichungList } from "@/const/organizers-taichung";
import { organizerKaohsiungList } from "@/const/organizers-kaohsiung";
import { Organizer } from "@/types/organizer";
import { organizerTainanList } from "@/const/organizers-tainan";
import { createRef } from "react";

export const organizerList: Array<Organizer> = [
  ...organizerTaipeiList,
  ...organizerTaichungList,
  ...organizerTainanList,
  ...organizerKaohsiungList,
];

export interface AppState {
  domLoaded: boolean;
  setDomLoaded: () => void;
  installPromptBannerRef: any;
  getFuegoBannerRef: any;
}

export const useAppState = create<AppState>(set => ({
  domLoaded: false,
  setDomLoaded: () => set(() => ({ domLoaded: true })),
  installPromptBannerRef: createRef(),
  getFuegoBannerRef: createRef(),
}));
