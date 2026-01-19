import cookieStore from '@/store/cookie';
import { fetcher } from "@/utils/fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const useLogin = () => {
    const { data, isLoading } = useSWR(cookieStore.getAuthToken() ? `/social-dance/me` : '', fetcher);
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        if (isLoading) return
        setIsLogin(() => !!data)
    }, [isLoading, data])

    return { isLogin }
}