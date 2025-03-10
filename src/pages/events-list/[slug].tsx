import { teamList } from "@/const/teams";
import { locateList } from "@/const/locate";
import { fetcher } from "@/utils/fetcher";
import { ActionIcon, Button, Select, Textarea, TextInput, MultiSelect } from "@mantine/core";
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import dayjs from "dayjs";
import { useRouter } from "next/router"
import { useEffect, useRef, useState, } from "react";
import iconClock from '../../../public/icon-clock.svg'
import useSWR from "swr";
import Image from "next/image";
import { danceTypes } from "@/const/dance-types";

export default function EditEvents() {
    const [loading, setLoading] = useState(false)
    const startAtRef = useRef<HTMLInputElement>(null);
    const endAtRef = useRef<HTMLInputElement>(null);
    const router = useRouter()
    const { data, error, isLoading } = useSWR(`/social-dance/events/${router.query.slug}`, fetcher);
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            date: '',
            title: '',
            host: {},
            locate: {},
            startAt: '',
            endAt: '',
            rate: '',
            types: [],
            fee: '',
            content: '',
            note: ''
        },
        validate: {
            title: (value) => value ? null : 'needed',
            rate: (value) => value ? null : 'needed',
            fee: (value) => value ? null : 'needed',
        },
    });

    useEffect(() => {
        if (!data) return

        if (Object.keys(data).length === 0) return

        form.setValues({
            date: dayjs(data.result.date).toDate() as any,
            title: data.result.title,
            host: data.result.host,
            locate: data.result.locate,
            startAt: data.result.startAt,
            endAt: data.result.endAt,
            rate: data.result.rate,
            types: data.result.types,
            fee: data.result.fee,
            content: data.result.content,
            note: data.result.note
        });

    }, [data])

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true)
        values.date = dayjs(values.date).format('YYYY-MM-DDT00:00:00')

        try {
            await fetcher(`/social-dance/events/${router.query.slug}`, {
                method: 'PUT',
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
                src={iconClock}
                alt="clock"
            />
        </ActionIcon>
    );

    const endAtPickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => endAtRef.current?.showPicker()}>
            <Image
                priority
                src={iconClock}
                alt="clock"
            />
        </ActionIcon>
    );


    if (error) return <div>failed to load</div>;

    if (isLoading) {
        return <div>loading...</div>;
    }

    if (!data.result) return

    return (
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
                data={teamList.map(item => ({ ...item, value: item.id, label: item.name }))}
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
            <br />
            <Textarea label="活動內容"
                key={form.key('content')}
                {...form.getInputProps('content')}
            />
            <Textarea label="備註"
                key={form.key('note')}
                {...form.getInputProps('note')}
            />
            <Button type="submit" className="!w-20" loading={loading}>更新</Button>
        </form>
    )
}

