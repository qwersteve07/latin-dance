import { organizerList } from "@/store/appStore";
import { locateList } from "@/const/locate";
import { fetcher } from "@/utils/fetcher";
import { ActionIcon, Button, Checkbox, MultiSelect, Select, Textarea, TextInput } from "@mantine/core";
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useRouter } from "next/router"
import { useRef, useState, } from "react";
import Image from "next/image";
import { danceTypes } from "@/const/dance-types";
import { useDay } from "@/use/use-day";
import { NextSeo } from "next-seo";
import { eventsTemplate } from "@/const/events-template";

export default function NewEvents() {
    const [loading, setLoading] = useState(false)
    const startAtRef = useRef<HTMLInputElement>(null);
    const endAtRef = useRef<HTMLInputElement>(null);
    const router = useRouter()
    const dayjs = useDay()

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            date: dayjs().toDate() as any,
            title: '',
            host: {},
            locate: {},
            startAt: '',
            endAt: '',
            rate: '',
            types: [],
            fee: '',
            canceled: '',
            content: '',
            note: ''
        },
        validate: {
            title: (value) => value ? null : 'needed',
            rate: (value) => value ? null : 'needed',
            fee: (value) => value ? null : 'needed',
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true)
        values.date = dayjs(values.date).format('YYYY-MM-DDT00:00:00')

        try {
            await fetcher(`/social-dance/events/`, {
                method: 'POST',
                body: JSON.stringify(values)
            })
            router.push('/events-list')
            setLoading(false)
        } catch (e) {
            console.log(e)
        } finally {
        }
    };

    const startAtPickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => startAtRef.current?.showPicker()}>
            <Image
                priority
                src='/icon-clock.svg'
                width="16"
                height="16"
                alt="clock"
            />
        </ActionIcon>
    );

    const endAtPickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => endAtRef.current?.showPicker()}>
            <Image
                priority
                src='/icon-clock.svg'
                width="16"
                height="16"
                alt="clock"
            />
        </ActionIcon>
    );

    return (
        <>
            <NextSeo noindex={true} />
            <div className="mb-4 font-bold text-xl">選擇模板</div>
            <div className="flex justify-start items-center flex-wrap gap-2 mb-6">
                {Object.entries(eventsTemplate).map(([templateId, data]: [string, any]) => {
                    return <div key={templateId} className="cursor-pointer  transition hover:bg-gray-50  hover:border-red-500 rounded-full px-3 py-1 border" onClick={() => {
                        form.setValues(data)
                    }}>{data.title}</div>
                })}
            </div>
            <form className="grid grid-cols-2 gap-4" onSubmit={form.onSubmit(handleSubmit)} >
                <DatePickerInput
                    label="日期"
                    valueFormat="YYYY/MM/DD"
                    key={form.key('date')}
                    {...form.getInputProps('date')}
                />
                <TextInput
                    withAsterisk
                    label="活動名稱"
                    key={form.key('title')}
                    {...form.getInputProps('title')}
                />
                <Select
                    withAsterisk
                    label="主辦單位"
                    data={organizerList.map(item => ({ ...item, value: item.id, label: item.name }))}
                    key={form.key('host')}
                    {...form.getInputProps('host')}
                />
                <Select
                    label="活動地點"
                    data={locateList.map(item => ({ ...item, value: item.id, label: item.name }))}
                    key={form.key('locate')}
                    {...form.getInputProps('locate')}
                />
                <TimeInput label="開始時間"
                    ref={startAtRef}
                    rightSection={startAtPickerControl}
                    key={form.key('startAt')}
                    {...form.getInputProps('startAt')}
                />
                <TimeInput label="結束時間"
                    ref={endAtRef}
                    key={form.key('endAt')}
                    rightSection={endAtPickerControl}
                    {...form.getInputProps('endAt')}
                />
                <TextInput label="比率"
                    key={form.key('rate')}
                    {...form.getInputProps('rate')} />
                <MultiSelect
                    label="舞種"
                    placeholder="Pick types"
                    data={danceTypes}
                    key={form.key('types')}
                    {...form.getInputProps('types')}
                />
                <TextInput label="費用"
                    key={form.key('fee')}
                    {...form.getInputProps('fee')} />
                <div className="flex justify-start items-center">
                    <Checkbox
                        label="本次取消"
                        key={form.key('canceled')}
                        {...form.getInputProps('canceled', { type: 'checkbox' })} />
                </div>
                <Textarea label="活動內容"
                    key={form.key('content')}
                    {...form.getInputProps('content')}
                />
                <Textarea label="備註"
                    key={form.key('note')}
                    {...form.getInputProps('note')}
                />
                <Button type="submit" className="!w-20" loading={loading}>新增</Button>
            </form>
        </>
    )
}

