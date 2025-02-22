import { Event } from "@/types/event";
import { fetcher } from "@/utils/fetcher";
import { getHost } from "@/utils/getHost";
import { getLocate } from "@/utils/getLocate";
import { Button, Group, Modal, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

export default function EventsList() {
    const router = useRouter()
    const { data, error, isLoading } = useSWR("/latin-dance/events", fetcher);
    const [removedId, setRemovedId] = useState('')
    const [opened, { open, close }] = useDisclosure(false);


    if (error) return <div>failed to load</div>;

    if (isLoading) {
        return <div>loading...</div>;
    }

    const rows = data.result.map((item: Event) => {
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

    function onCloseDialog() {
        setRemovedId('')
        close()
    }

    async function onDeleteEvent() {

        try {
            await fetcher(`/latin-dance/events/${removedId}`, {
                method: 'delete',
            })
            close()
        } catch (e) {
            console.log(e)
        }
    };


    return (
        <div>
            <div>
                {/* <Button onClick={}>新增活動</Button> */}
            </div>
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
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </div>
    )
}