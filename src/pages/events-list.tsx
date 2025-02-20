import { hostList } from "@/const/host";
import { locateList } from "@/const/locate";
import { Event } from "@/types/event";
import { fetcher } from "@/utils/fetcher";
import { Button, Table } from "@mantine/core";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function EventsList() {
    const router = useRouter()
    const { data, error, isLoading } = useSWR("/latin-dance/events", fetcher);

    if (error) return <div>failed to load</div>;

    if (isLoading) {
        return <div>loading...</div>;
    }

    const rows = data.result.map((item: Event) => (
        <Table.Tr key={item.id}>
            <Table.Td>{dayjs(item.date).format('YYYY/MM/DD')}</Table.Td>
            <Table.Td>{item.title}</Table.Td>
            <Table.Td>{hostList.find(h => h.id === item.host)?.name}</Table.Td>
            <Table.Td>{locateList.find(l => l.id === item.locate)?.name}</Table.Td>
            <Table.Td>{item.startAt}</Table.Td>
            <Table.Td>{item.endAt}</Table.Td>
            <Table.Td>{item.rate}</Table.Td>
            <Table.Td>{item.fee}</Table.Td>
            <Table.Td>
                <div>

                    <Button radius={20} size='compact-sm' onClick={() => router.push(`/events-list/${item.id}`)}>Edit</Button>
                    <Button radius={20} size='compact-sm' onClick={() => router.push(`/events-list/${item.id}`)}>Edit</Button>
                </div>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <div>
            <div>
                {/* <Button onClick={}>新增活動</Button> */}
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
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </div>
    )
}