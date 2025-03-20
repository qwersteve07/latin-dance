import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { organizerTaipeiList } from "@/const/organizers-taipei";
import { organizerTaichungList } from "@/const/organizers-taichung";
import { organizerKaohsiungList } from "@/const/organizers-kaohsiung"
import { Organizer } from '@/types/organizer';

export const organizerList: Array<Organizer> = [...organizerTaipeiList, ...organizerTaichungList, ...organizerKaohsiungList]

export

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