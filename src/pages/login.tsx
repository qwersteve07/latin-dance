import { useRouter } from 'next/router'
import { Button, TextInput, PasswordInput, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { fetcher } from '@/utils/fetcher';
import { useEffect, useState } from 'react';
import cookieStore from '@/store/cookie';
import { NextSeo } from 'next-seo';
import { useAppStore } from '@/store/appStore';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAppState } from '@/store/appState';

export default function LoginPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const appStore = useAppStore()
    const appState = useAppState()

    useEffect(() => {
        if (!appState.domLoaded) return

        form.setValues({
            username: appStore.username,
            password: appStore.password,
            rememberMe: appStore.rememberMe,
        });

    }, [appState.domLoaded])

    const form = useForm({
        mode: 'uncontrolled',
        onValuesChange: (values) => {
            appStore.setRememberMe(values.rememberMe)
            if (values.rememberMe) {
                appStore.setUsername(values.username)
                appStore.setPassword(values.password)
            } else {
                appStore.setUsername("")
                appStore.setPassword("")
            }
        },
        validate: {
            username: (value) => value ? null : 'needed',
            password: (value) => value ? null : 'needed',
        },
    });

    async function handleSubmit(value: any) {
        setLoading(true)

        try {
            const result = await fetcher(`/social-dance/login`, {
                method: 'POST',
                body: JSON.stringify(value)
            })

            if (result.error) throw result
            cookieStore.setAuthToken(result.data.accessToken);
            cookieStore.setRefreshToken(result.data.refreshToken);
            router.push('/calendar')
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)

        }
    }

    return (
        <>
            <NextSeo noindex={true} />
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="帳戶"
                    placeholder="input username..."
                    key={form.key('username')}
                    {...form.getInputProps('username')}
                />
                <PasswordInput
                    label="密碼"
                    placeholder="Input password.."
                    key={form.key('password')}
                    {...form.getInputProps('password')}
                />
                <Checkbox
                    label="Remember me"
                    className='mt-4'
                    key={form.key('rememberMe')}
                    {...form.getInputProps('rememberMe', { type: 'checkbox' })}
                />
                <Button type="submit" className='mt-4' loading={loading}>登入</Button>
            </form>
        </>
    )
}

export async function getServerSideProps({ locale }: { locale: any }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common',
            ])),
        },
    }
}