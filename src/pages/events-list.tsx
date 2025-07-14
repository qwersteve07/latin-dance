import { Event } from "@/types/event";
import { useDay } from "@/use/use-day";
import { fetcher } from "@/utils/fetcher";
import { getHost } from "@/utils/getHost";
import { getLocate } from "@/utils/getLocate";
import { Button, Group, Modal, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import useSWR from "swr";

export default function EventsList() {
    const router = useRouter()
    const { data, error, isLoading } = useSWR("/social-dance/events", fetcher);
    const [removedId, setRemovedId] = useState('')
    const [opened, { open, close }] = useDisclosure(false);
    const [groupData, setGroupData] = useState<any>([])
    const [ready, setReady] = useState(false)
    const itemRefs: any = useRef([]);
    const dayjs = useDay()

    useEffect(() => {
        if (isLoading) return;

        const newData = data.result.map((d: any) => ({ ...d, month: dayjs(d.date).month() }))

        setGroupData(() => Object.groupBy(newData, ({ month }: { month: number }) => month.toString()));

    }, [data, isLoading])

    useEffect(() => {
        if (!ready) return
        const currentMonth = dayjs().month()
        const monthEl: any = itemRefs.current[currentMonth]
        const monthTop = monthEl?.offsetTop
        window.scrollTo({
            top: monthTop - 50,
        })
    }, [ready])


    if (error) return <div>failed to load</div>;

    if (isLoading) {
        return <div>loading...</div>;
    }

    const TableRow = ({ data }: { data: any }) => {
        return data.map((item: Event) => {
            return (
                <Table.Tr key={item.id}>
                    <Table.Td>{dayjs(item.date).format('YYYY/MM/DD')}</Table.Td>
                    <Table.Td>{item.title}</Table.Td>
                    <Table.Td>{getHost(item.host)}</Table.Td>
                    <Table.Td>{getLocate(item.locate)}</Table.Td>
                    <Table.Td>{item.startAt}</Table.Td>
                    <Table.Td>{item.endAt}</Table.Td>
                    <Table.Td>{item.rate}</Table.Td>
                    <Table.Td>{item.fee}</Table.Td>
                    <Table.Td>
                        <Group className="w-32">
                            <Button radius={20} size='compact-sm' onClick={() => router.push(`/events-list/${item.id}`)}>編輯</Button>
                            <Button color="red" radius={20} size='compact-sm' onClick={() => {
                                open();
                                setRemovedId(item.id)
                            }}>刪除</Button>
                        </Group>
                    </Table.Td>
                </Table.Tr>
            )
        });
    }

    function onCloseDialog() {
        setRemovedId('')
        close()
    }

    async function onDeleteEvent() {
        try {
            await fetcher(`/social-dance/events/${removedId}`, {
                method: 'delete',
            })
            close()
        } catch (e) {
            console.log(e)
        }
    };

    function onAddEvent() {
        router.push('/events-list/new')
    }

    return (
        <>
            <NextSeo noindex={true} />
            <Modal
                opened={opened}
                onClose={onCloseDialog}
                title={<b>移除活動</b>}
                centered
            >
                確定移除此活動？
                <Group mt="xl" justify="space-between">
                    <Button variant="outline" onClick={onCloseDialog}>取消</Button>
                    <Button onClick={onDeleteEvent}>確定</Button>
                </Group>

            </Modal>
            {Object.entries(groupData).map(([month, value]: [string, any]) => {
                return (
                    <div key={month} ref={el => {
                        itemRefs.current[parseInt(month)] = el
                        if (parseInt(month) === 11) {
                            setReady(true)
                        }
                    }} className="mb-20">
                        <div className="flex justify-start items-center mb-4 gap-4">
                            <div className="text-4xl font-bold ">{parseInt(month) + 1} 月</div>
                            <Button onClick={onAddEvent}>新增活動</Button>
                        </div>
                        <Table stickyHeader stickyHeaderOffset={60} highlightOnHover>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>日期</Table.Th>
                                    <Table.Th>活動名稱</Table.Th>
                                    <Table.Th>主辦單位</Table.Th>
                                    <Table.Th>活動地點</Table.Th>
                                    <Table.Th>開始時間</Table.Th>
                                    <Table.Th>結束時間</Table.Th>
                                    <Table.Th>比率</Table.Th>
                                    <Table.Th>費用</Table.Th>
                                    <Table.Th></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                <TableRow data={value} />
                            </Table.Tbody>
                        </Table>
                    </div>
                )
            })}

        </>
    )
}