import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AppStore {
    currentCity: string
    setCurrentCity: (city: string) => void
}

export const useAppStore = create<AppStore>()(
    devtools(
        persist(
            (set) => ({
                currentCity: 'taipei',
                setCurrentCity: (city: string) => set(() => ({ currentCity: city })),
            }),
            {
                name: 'appStore',
            },
        ),
    ),
)