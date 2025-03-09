import { teamList } from "@/const/teams"

export const getHost = (host: string | null) => {
    if (!host) return ''
    return teamList.find(h => h.id === host)?.name
}