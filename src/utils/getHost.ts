import { hostList } from "@/const/host"

export const getHost = (host: string | null) => {
    if (!host) return ''
    return hostList.find(h => h.id === host)?.name
}