import { fetcher } from "@/utils/fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const useLogin = () => {
    const { data, isLoading } = useSWR(`/social-dance/me`, fetcher);
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        console.log(isLoading)
        if (isLoading) return
        setIsLogin(() => data !== null)
    }, [isLoading])

    return { isLogin }
}