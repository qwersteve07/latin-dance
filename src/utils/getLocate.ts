import { locateList } from "@/const/locate"

export const getLocate = (locate: string) => {
    if (!locate) return
    return locateList.find(l => l.id === locate)?.name
}