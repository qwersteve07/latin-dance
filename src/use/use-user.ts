import cookieStore from '@/store/cookie';
import { fetcher } from "@/utils/fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const useUser = () => {
    const { data, isLoading } = useSWR(cookieStore.getAuthToken() ? `/social-dance/me` : '', fetcher);
    const [isLogin, setIsLogin] = useState(false)
    const [userRole, setUserRole] = useState('')

    function isSU(userRole: string) {
        return userRole === 'superUser' || userRole === 'user'
    }

    useEffect(() => {
        if (isLoading) return
        if (data) {
            setIsLogin(true)
            setUserRole(data.result.role)
        }
    }, [isLoading, data])

    return { isSU, userRole, isLogin }
}