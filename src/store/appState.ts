import { create } from "zustand";
import { createRef } from "react";
import { locationTaipei } from "@/const/location-taipei";
import { locationTaichung } from "@/const/location-taichung";
import { locationTainan } from "@/const/location-tainan";
import { locationKaohsiung } from "@/const/location-kaohsiung";
import { Location } from "@/types/locate";
import { Organizer } from "@/types/organizer";

export const locateList: Array<Location> = [
  ...locationTaipei,
  ...locationTaichung,
  ...locationTainan,
  ...locationKaohsiung,
]

export interface AppState {
  domLoaded: boolean;
  setDomLoaded: () => void;
  installPromptBannerRef: any;
  getFuegoBannerRef: any;
  organizers: Organizer[],
  setOrganizers: (organizer: Organizer[]) => void
  organizerLoaded: boolean,
  setOrganizerLoaded: () => void;
}

export const useAppState = create<AppState>(set => ({
  domLoaded: false,
  setDomLoaded: () => set(() => ({ domLoaded: true })),
  installPromptBannerRef: createRef(),
  getFuegoBannerRef: createRef(),
  organizers: [],
  setOrganizers: (organizers: Organizer[]) => set(() => ({ organizers })),
  organizerLoaded: false,
  setOrganizerLoaded: () => set(() => ({ organizerLoaded: true })),
}));
