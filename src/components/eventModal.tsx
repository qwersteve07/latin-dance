import { EventWithEventDate } from "@/types/event"
import { getHost } from "@/utils/getHost"
import { getLocate, getLocateLink } from "@/utils/getLocate"
import { Button, Modal } from "@mantine/core"
import OuterLink from "./outerLink"
import IconLocate from '../../public/icon-location.svg'
import { useDay } from "@/use/use-day"
import DanceTypeCube from "./dance-type-cube"
import { useLogin } from "@/use/use-login"
import { useAppStore } from "@/store/appStore"

const EventModal = ({ opened, onClose, data, onOpenEditModal, onOpenDeleteModal }: { opened: boolean, onClose: () => void, data: Partial<EventWithEventDate>, onOpenEditModal: (id: string) => void, onOpenDeleteModal: () => void }) => {
    const { isLogin } = useLogin()
    const dayjs = useDay()
    const hasLocate = Object.keys(data.locate || {}).length !== 0
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
            title={<div className="flex justify-start items-center">
                <b className="text-xl">{data.title}</b>
                {data.canceled && <span className="text-red-500 font-bold ml-4">本週取消！Canceled！</span>}</div>}
            centered
        >
            <div className="flex flex-wrap gap-2 mb-3">
                {data.types?.map(t => {
                    return (
                        <div className="flex justify-start items-center gap-2 border border-border-main rounded-full h-8 px-3" key={t}>
                            <DanceTypeCube type={t} key={t} />
                            {t}
                        </div>)
                })}
            </div>
            <div className="grid grid-cols-[80px,1fr] gap-2">
                {data.host && (
                    <>
                        <div className="font-semibold">Host</div>
                        <div>{getHost(data.host)}</div>
                    </>
                )}
                <div className="font-bold">Locate</div>
                <div>
                    {hasLocate ?
                        (<OuterLink href={getLocateLink(data.locate || '')}>
                            <div className="group inline-flex justify-start items-center gap-1">
                                {getLocate(data.locate || '')}
                                <IconLocate className="transition-stroke duration-200 group-hover:stroke-red-500 w-5" />
                            </div>
                        </OuterLink>)
                        : 'TBD'}
                </div>
                <div className="font-semibold">Date</div>
                <div>{dayjs(data.eventDate || data.date).format('YYYY/MM/DD')}</div>
                <div className="font-semibold">Time</div>
                <div>{data.startAt} - {data.endAt}</div>
                <div className="font-semibold">Fee</div>
                <div>{data.fee}</div>
                <div className="font-semibold">Rate</div>
                <div>{data.rate}</div>
                {data.content &&
                    (
                        <>
                            <div className="font-semibold">Content</div>
                            <div>{data.content}</div>
                        </>
                    )}
                {data.note &&
                    (
                        <>
                            <div className="font-semibold">Note</div>
                            <div>{data.note}</div>
                        </>
                    )}
                {isLogin && isUserEvent() && <div className="col-span-2 flex justify-end items-center gap-3">
                    <Button radius={20} size='compact-sm' onClick={() => {
                        onOpenEditModal(data.id as string)
                    }}>編輯</Button>
                    <Button color="red" radius={20} size='compact-sm' onClick={onOpenDeleteModal}>刪除</Button>
                </div>}
            </div>
        </Modal >
    )
}

export default EventModal