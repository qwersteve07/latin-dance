import { useRouter } from 'next/router'
import { Button, TextInput, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { fetcher } from '@/utils/fetcher';
import { useState } from 'react';
import cookieStore from '@/store/cookie';

export default function LoginPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            username: '',
            password: '',
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
            cookieStore.setAuthToken(result.token);
            router.push('/events-list')

        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)

        }
    }

    return (
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
            <Button type="submit" className='mt-4' loading={loading}>登入</Button>
        </form>
    )
}