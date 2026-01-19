import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface AppStore {
  currentCity: string;
  setCurrentCity: (city: string) => void;
  installBannerHide: boolean;
  setInstallBannerHide: () => void;
  getFuegoBannerHide: boolean;
  setGetFuegoBannerHide: () => void;
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  rememberMe: boolean;
  setRememberMe: (rememberMe: boolean) => void;
  user: undefined,
  setUser: (user: any) => void
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
        username: "",
        setUsername: (username: string) => set(() => ({ username })),
        password: "",
        setPassword: (password: string) => set(() => ({ password })),
        rememberMe: false,
        setRememberMe: (rememberMe: boolean) => set(() => ({ rememberMe })),
        user: undefined,
        setUser: (user: any) => set(() => ({ user }))
      }),
      {
        name: "appStore",
      }
    )
  )
);
