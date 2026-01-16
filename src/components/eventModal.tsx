import { Clock, Calendar, MapPin, User, DollarSign, Music, CircleAlert } from "lucide-react"
import { EventWithEventDate } from "@/types/event"
import { getHost } from "@/utils/getHost"
import { getLocate, getLocateLink } from "@/utils/getLocate"
import { Modal } from "@mantine/core"
import OuterLink from "./outerLink"
import { useDay } from "@/use/use-day"
import DanceTypeBadge from "./danceTypeBadge"

const EventModal = ({ opened, onClose, data }: { opened: boolean, onClose: () => void, data: Partial<EventWithEventDate> }) => {
    const dayjs = useDay()
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            centered
            title={
                <>
                    {data.canceled &&
                        <div className="flex justify-start items-center gap-1 text-red-500 font-bold text-sm mb-2">
                            <CircleAlert className="h-4 w-4" />
                            This Event Has been Canceled
                        </div>
                    }
                    <div className={`flex justify-start items-center text-2xl font-bold ${data.canceled && 'line-through'}`}>
                        {data.title}
                    </div>
                </>}
        >
            <div className="flex flex-wrap gap-2 mb-3">
                {data.types?.map(t => <DanceTypeBadge type={t} key={t} />)}
            </div>
            <div className="space-y-4 pt-2">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{dayjs(data.eventDate || data.date).format('YYYY-MM-DD')}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{data.startAt} - {data.endAt}</span>
                    </div>
                </div>
                <div className="border-t border-gray-800" />
                <div className="flex flex-col gap-2">
                    {data.host && <div className="flex items-center gap-3 text-gray-500">
                        <User className="h-4 w-4" />
                        <span className="text-sm">
                            Hosted by <span className="text-gray-300 font-medium">{getHost(data.host)}</span>
                        </span>
                    </div>}
                    <div className="flex items-center gap-3 text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">
                            <OuterLink href={getLocateLink(data.locate || '')}>
                                <div className="text-gray-300">
                                    {getLocate(data.locate || '')}
                                </div>
                            </OuterLink>
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-sm">{data.fee}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500">
                        <Music className="h-4 w-4" />
                        <span className="text-sm">{data.rate}</span>
                    </div>
                </div>
                {(data.content || data.note) &&
                    <>
                        <div className="border-t border-gray-800" />
                        <div>
                            <h4 className="text-sm font-medium text-gray-300 mb-2">About this event</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">{data.content}</p>
                            <p className="text-sm text-gray-500 leading-relaxed">{data.note}</p>
                        </div>
                    </>
                }
            </div>
        </Modal >
    )
}

export default EventModal