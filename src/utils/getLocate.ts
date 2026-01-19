import { locateList } from "@/store/appState"

export const getLocate = (locate: string) => {
    if (!locate) return ''
    return locateList.find(l => l.id === locate)?.name || ''
}

export const getLocateCity = (locate: string) => {
    if (!locate) return ''
    return locateList.find(l => l.id === locate)?.city || ''
}

export const getLocateLink = (locate: string) => {
    if (!locate) return ''
    return locateList.find(l => l.id === locate)?.url || ''
}