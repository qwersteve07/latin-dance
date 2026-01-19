import { Clock, Calendar, MapPin, User, DollarSign, Music, CircleAlert } from "lucide-react"
import { getHost } from "@/utils/getHost"
import { getLocate, getLocateLink } from "@/utils/getLocate"
import { Button, Modal } from "@mantine/core"
import OuterLink from "./outerLink"
import { useDay } from "@/use/use-day"
import DanceTypeBadge from "./danceTypeBadge"
import { DanceType } from "@/types/danceTypes"
import { useLogin } from "@/use/use-login"
import { useAppStore } from "@/store/appStore"

const EventModal = ({ opened, onClose, data, onOpenEditModal, onOpenDeleteModal }: { opened: boolean, onClose: () => void, data: any, onOpenEditModal?: (id: string) => void, onOpenDeleteModal?: () => void }) => {
    const { isLogin } = useLogin()
    const dayjs = useDay()
    const appStore = useAppStore()
    const userRole: string = appStore.user ? appStore.user['role'] : ''
    const isUserEvent = () => {
        if (userRole === 'superUser' || userRole === 'user') return true
        return userRole === data.host
    }

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
                {data.types?.map((t: DanceType) => <DanceTypeBadge type={t} key={t} />)}
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

                <div className="border-t border-background-third" />
                <div className="flex flex-col gap-2">
                    {data.host && <div className="flex items-center gap-3 text-gray-500">
                        <User className="h-4 w-4" />
                        <span className="text-sm">
                            Hosted by <span className="text-text-main">{getHost(data.host)}</span>
                        </span>
                    </div>}
                    <div className="flex items-center gap-3 text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">
                            <OuterLink href={getLocateLink(data.locate || '')}>
                                <div className="text-text-main font-bold">
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
                        <div className="border-t border-background-third" />
                        <div>
                            <h4 className="text-sm font-medium text-gray-300 mb-2">About this event</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">{data.content}</p>
                            <p className="text-sm text-gray-500 leading-relaxed">{data.note}</p>
                        </div>
                    </>
                }
                {
                    onOpenEditModal && isLogin && isUserEvent() && <div className="col-span-2 flex justify-end items-center gap-3">
                        <Button radius={20} size='compact-sm' onClick={() => {
                            onOpenEditModal(data.id as string)
                        }}>編輯</Button>
                        <Button color="red" radius={20} size='compact-sm' onClick={onOpenDeleteModal}>刪除</Button>
                    </div>
                }
            </div >
        </Modal >
    )
}

export default EventModal