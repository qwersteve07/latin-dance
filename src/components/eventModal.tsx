import { Event } from "@/types/event"
import { getHost } from "@/utils/getHost"
import { getLocate, getLocateLink } from "@/utils/getLocate"
import { Modal } from "@mantine/core"
import dayjs from "dayjs"
import OuterLink from "./outerLink"
import Image from "next/image"

const EventModal = ({ opened, onClose, data }: { opened: boolean, onClose: () => void, data: Partial<Event> }) => {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={<b className="text-xl">{data.title}</b>}
            centered

        >
            <div className="grid grid-cols-[80px,1fr] gap-2">
                <div className="font-semibold">Host</div>
                <div>{getHost(data.host || '')}</div>
                <div className="font-semibold">Locate</div>
                <div>
                    <OuterLink href={getLocateLink(data.locate || '')}>
                        <div className="inline-flex justify-start items-center gap-1">
                            {getLocate(data.locate || '')}
                            <Image
                                src="/icon-location.svg"
                                width="15"
                                height="15"
                                alt="locate"
                                priority
                            />
                        </div>
                    </OuterLink>
                </div>
                <div className="font-semibold">Date</div>
                <div>{dayjs(data.eventDate || data.date).format('YYYY/MM/DD')}</div>
                <div className="font-semibold">Time</div>
                <div>{data.startAt} - {data.endAt}</div>
                <div className="font-semibold">Fee</div>
                <div>{data.fee}</div>
                <div className="font-semibold">Rate</div>
                <div>{data.rate}</div>
            </div>
        </Modal >
    )
}

export default EventModal