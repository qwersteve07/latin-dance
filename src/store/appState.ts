import { create } from "zustand";
import { organizerTaipeiList } from "@/const/organizers-taipei";
import { organizerTaichungList } from "@/const/organizers-taichung";
import { organizerKaohsiungList } from "@/const/organizers-kaohsiung";
import { Organizer } from "@/types/organizer";
import { organizerTainanList } from "@/const/organizers-tainan";
import { createRef } from "react";
import { classesTaipeiList } from "@/const/classes-taipei";
import { classesTaichungList } from "@/const/classes-taichung";
import { Classes } from "@/types/classes";

export const organizerList: Array<Organizer> = [
  ...organizerTaipeiList,
  ...organizerTaichungList,
  ...organizerTainanList,
  ...organizerKaohsiungList,
];

export const classesList: Array<Classes> = [
  ...classesTaipeiList,
  ...classesTaichungList,
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
