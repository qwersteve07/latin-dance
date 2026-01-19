import { fetcher } from "@/utils/fetcher";
import { ActionIcon, Button, Select, Textarea, TextInput, MultiSelect, Checkbox, Drawer } from "@mantine/core";
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useEffect, useRef, useState, } from "react";
import useSWR, { useSWRConfig } from "swr";
import Image from "next/image";
import { danceTypes } from "@/const/dance-types";
import { useDay } from "@/use/use-day";
import { locateList, organizerList } from "@/store/appState";
import { eventsTemplate } from "@/const/events-template";
import { useAppStore } from "@/store/appStore";
import { getLocateCity } from "@/utils/getLocate";

function EventEditModal({ opened, onClose, id, defaultDate }: { opened: boolean, onClose: () => void, id: string, defaultDate: string }) {
    const [loading, setLoading] = useState(false)
    const startAtRef = useRef<HTMLInputElement>(null);
    const endAtRef = useRef<HTMLInputElement>(null);
    const { data, error, isLoading } = useSWR(id ? `/social-dance/events/${id}` : null, fetcher);
    const { mutate } = useSWRConfig()

    const dayjs = useDay()
    const appStore = useAppStore()
    const userRole: string = appStore.user ? appStore.user['role'] : ''

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

    useEffect(() => {
        if (opened) {
            if (id) {
                mutate(`/social-dance/events/${id}`)
            } else {
                form.setValues({
                    date: dayjs(defaultDate).toDate() as any,
                })
            }
        } else {
            form.reset();
            form.setValues({
                date: dayjs(defaultDate).toDate() as any,
            })

        }
    }, [opened, id, defaultDate])

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
            canceled: data.result.canceled,
            content: data.result.content,
            note: data.result.note
        });

    }, [data])

    const filteredEventsTemplate = () => {
        const filteredTemplate = Object.entries(eventsTemplate).filter((t: any) => {
            const city = getLocateCity(t[1].locate)
            if (appStore.currentCity === 'south-taiwan') {
                return city === 'tainan' || city === 'kaohsiung' || city === 'pingtung'
            }
            return city === appStore.currentCity
        })

        if (userRole === 'superUser' || userRole === 'user') return filteredTemplate

        return filteredTemplate
            .filter((t: any) => {
                return t[1].host === userRole
            })
    }

    const filteredOrganizer = () => {
        if (userRole === 'superUser' || userRole === 'user') return organizerList

        return organizerList.filter((o: any) => {
            return o.id === userRole
        })
    }

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true)
        values.date = dayjs(values.date).format('YYYY-MM-DDT00:00:00')

        try {
            if (!id) {
                await fetcher(`/social-dance/events/`, {
                    method: 'POST',
                    body: JSON.stringify(values)
                })
            } else {
                await fetcher(`/social-dance/events/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(values)
                })
            }
            onClose()
            setLoading(false)
        } catch (e) {
            console.log(e)
        } finally {
        }
    };

    const startAtPickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => startAtRef.current?.showPicker()}>
            <Image
                src='/icon-clock.svg'
                alt="clock"
                width="16"
                height="16"
            />
        </ActionIcon>
    );

    const endAtPickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => endAtRef.current?.showPicker()}>
            <Image
                src='/icon-clock.svg'
                alt="clock"
                width="16"
                height="16"
            />
        </ActionIcon>
    );


    if (error || isLoading) return <div></div>;

    return (
        <Drawer position="right" opened={opened} onClose={onClose}>
            {!id && <div className="flex justify-start items-center flex-wrap gap-2 mb-6">
                {filteredEventsTemplate().map(([templateId, data]: [string, any]) => {
                    return <div key={templateId} className="cursor-pointer  transition hover:bg-gray-50  hover:border-red-500 rounded-full px-3 py-1 border" onClick={() => {
                        form.setValues(data)
                    }}>{data.title}</div>
                })}
            </div>}
            <form className="flex flex-col gap-4" onSubmit={form.onSubmit(handleSubmit)} >
                <div className="flex justify-start items-center">
                    <Checkbox
                        label="本次取消"
                        key={form.key('canceled')}
                        {...form.getInputProps('canceled', { type: 'checkbox' })} />
                </div>
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
                    data={filteredOrganizer().map((item: any) => ({ ...item, value: item.id, label: item.name }))}
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
                    withAsterisk
                    label="舞種"
                    placeholder="Pick types"
                    data={danceTypes}
                    key={form.key('types')}
                    {...form.getInputProps('types')}
                />
                <TextInput label="費用"
                    key={form.key('fee')}
                    {...form.getInputProps('fee')} />

                <Textarea label="活動內容"
                    key={form.key('content')}
                    {...form.getInputProps('content')}
                />
                <Textarea label="備註"
                    key={form.key('note')}
                    {...form.getInputProps('note')}
                />
                <Button type="submit" className="col-span-2" loading={loading}>儲存</Button>
            </form>
        </Drawer >
    );
}

export default EventEditModal