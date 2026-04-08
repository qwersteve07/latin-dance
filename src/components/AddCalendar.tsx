import { citiesList } from "@/const/cities";
import { useAppStore } from "@/store/appStore";
import { Calendar } from "lucide-react";

const AddCalendar = () => {
    const appStore = useAppStore()
    const chineseName = () => {
        return citiesList.find((city: any) => city.id === appStore.currentCity)?.name || ''
    }

    const calendarLink = () => {
        const calendarId = () => {
            switch (appStore.currentCity) {
                case 'taipei': return 'ec733cbbe56f90c9acd2c47828fadc6931174e8b2a9ced82b3ad69d859303cc0@group.calendar.google.com'
                case 'taichung': return '7545e8582ab41487b9328126af6c1fca5b545f96b113b96c8982ff4aeb9567dc@group.calendar.google.com'
                default: return '2716680e39594079d1d881c584ddeddaa93feec79e5fe6aa0274a3ab01b3a8ee@group.calendar.google.com'
            }

        }

        return `https://calendar.google.com/calendar/render?cid=${calendarId()}`
    }
    return (
        <div className='relative group w-12 h-12 bg-red-500 rounded-full 
        flex justify-center items-center
        '>
            <Calendar
                className="w-7  group-hover:-rotate-[20deg] transition-[transform] z-10"
            />
            <div className='pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-[opacity] 
            absolute bottom-0 right-0
            py-3 px-4 pr-12 w-60 max-md:w-[calc(100vw-32px)] bg-red-500 text-white rounded-3xl'>
                一鍵加入<a className="font-bold cursor-pointer" target="_blank" href={calendarLink()}>{chineseName()}日曆！</a>
            </div>
        </div>
    )
}

export default AddCalendar