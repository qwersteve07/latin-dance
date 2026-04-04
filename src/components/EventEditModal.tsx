import { fetcher } from "@/utils/fetcher";
import { ActionIcon, Button, Select, Textarea, TextInput, MultiSelect, Checkbox, Drawer } from "@mantine/core";
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useEffect, useRef, useState, } from "react";
import useSWR, { useSWRConfig } from "swr";
import Image from "next/image";
import { danceTypes } from "@/const/dance";
import { useDay } from "@/use/use-day";
import { locateList, useAppState } from "@/store/appState";
import { eventsTemplate } from "@/const/events-template";
import { useAppStore } from "@/store/appStore";
import { getLocate, getLocateCity } from "@/utils/getLocate";
import { useUser } from "@/use/use-user";
import { Event } from "@/types/event";
import { getHost } from "@/utils/getHost";

function EventEditModal({ opened, onClose, id, defaultData }: { opened: boolean, onClose: () => void, id: string, defaultData: any }) {
    const [loading, setLoading] = useState(false)
    const startAtRef = useRef<HTMLInputElement>(null);
    const endAtRef = useRef<HTMLInputElement>(null);
    const { data, error, isLoading } = useSWR(id ? `/social-dance/events/${id}` : null, fetcher);
    const { mutate } = useSWRConfig()
    const dayjs = useDay()
    const appStore = useAppStore()
    const appState = useAppState()
    const { userRole, isSU } = useUser()

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            date: '',
            title: '',
            host: '',
            locate: '',
            startAt: '',
            endAt: '',
            rate: '',
            types: [],
            fee: '',
            canceled: false,
            content: '',
            note: '',
            eventUrl: '',
        },
        validate: {
            date: (value) => value ? null : 'needed',
            title: (value) => value ? null : 'needed',
            locate: (value) => Object.entries(value).length !== 0 ? null : 'needed',
            startAt: (value) => value ? null : 'needed',
            endAt: (value) => value ? null : 'needed',
            types: (value) => value.length !== 0 ? null : 'needed',
        },
    });

    useEffect(() => {
        if (opened) {
            if (id) {
                mutate(`/social-dance/events/${id}`)
            } else {
                form.setValues({
                    ...defaultData,
                    host: defaultData.host ? defaultData.host : userRole,
                })
            }
        } else {
            form.reset();
        }
    }, [opened, id, defaultData])

    useEffect(() => {
        if (!data) return

        if (Object.keys(data).length === 0) return

        form.setValues({
            ...data.result,
            date: dayjs(data.result.date).toDate() as any,
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

        if (isSU(userRole)) return filteredTemplate

        return filteredTemplate
            .filter((t: any) => {
                return t[1].host === userRole
            })
    }

    const filteredOrganizer = () => {
        if (isSU(userRole)) return appState.organizers

        return appState.organizers.filter((o: any) => {
            return o.id === userRole
        })
    }

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true)
        const confirmedValues: Event = {
            date: dayjs(values.date).format('YYYY-MM-DDT00:00:00'),
            title: values.title,
            host: values.host,
            hostName: getHost(values.host),
            locate: values.locate,
            locateName: getLocate(values.locate),
            area: getLocateCity(values.locate),
            startAt: values.startAt,
            endAt: values.endAt,
            rate: values.rate,
            types: values.types,
            fee: values.fee,
            canceled: values.canceled,
            content: values.content,
            note: values.note,
            eventUrl: values.eventUrl,
        }

        try {
            if (!id) {
                await fetcher(`/social-dance/events/`, {
                    method: 'POST',
                    body: JSON.stringify(confirmedValues)
                })
            } else {
                await fetcher(`/social-dance/events/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(confirmedValues)
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
                    return <div key={templateId} className="cursor-pointer transition hover:bg-background-third  hover:border-red-500 rounded-full px-3 py-1 border" onClick={() => {
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
                    withAsterisk
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
                    label="主辦單位"
                    searchable
                    data={filteredOrganizer().map((item: any) => ({ ...item, value: item.id, label: item.name }))}
                    key={form.key('host')}
                    {...form.getInputProps('host')}
                />
                <Select
                    withAsterisk
                    label="活動地點"
                    data={locateList.map(item => ({ ...item, value: item.id, label: item.name }))}
                    key={form.key('locate')}
                    searchable
                    {...form.getInputProps('locate')}
                />
                <TimeInput label="開始時間"
                    withAsterisk
                    ref={startAtRef}
                    rightSection={startAtPickerControl}
                    key={form.key('startAt')}
                    {...form.getInputProps('startAt')}
                />
                <TimeInput label="結束時間"
                    withAsterisk
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
                <TextInput label="連結"
                    key={form.key('eventUrl')}
                    {...form.getInputProps('eventUrl')}
                />
                <Button type="submit" className="col-span-2" loading={loading}>儲存</Button>
            </form>
        </Drawer >
    );
}

export default EventEditModal