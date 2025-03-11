import { organizerList } from "@/const/organizers"

export const getHost = (host: string | null) => {
    if (!host) return ''
    return organizerList.find(h => h.id === host)?.name
}