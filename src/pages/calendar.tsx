import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import dayjs from "dayjs";
import { useMedia } from "react-use";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { Event, EventWithEventDate } from "@/types/event";
import EventModal from "@/components/eventModal";
import Title from "@/components/title";
import { danceTypes } from "@/const/dance-types";
import Loading from "@/components/loading";
import { useAppStore } from "@/store/appStore";
import { getEventsFilterByCity } from "@/utils/getEvents";

export const danceTypeColor = (type: string) => {
  switch (type) {
    case 'salsa on 1': return 'bg-red-800';
    case 'salsa on 2': return 'bg-red-400';
    case 'bachata': return 'bg-yellow-300';
    case 'zouk': return 'bg-blue-400';
    case 'lambada': return 'bg-green-300';
    case 'kizomba': return 'bg-purple-400'
  }
}

export default function Calendar() {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectEvent, setSelectEvent] = useState<Partial<EventWithEventDate>>({});
  const { data, error, isLoading } = useSWR("/social-dance/events", fetcher);
  const [currentData, setCurrentData] = useState<Array<Event>>([])
  const [selectTypes, setSelectTypes] = useState<string[]>([]);
  const appStore = useAppStore()

  useEffect(() => {
    if (isLoading) return
    if (!data?.result) return
    if (!appStore.currentCity) return

    let result;
    if (selectTypes.length === 0) {
      result = getFilteredCurrentData([], appStore.currentCity)
    } else {
      result = getFilteredCurrentData(selectTypes, appStore.currentCity)
    }

    setCurrentData(result)
  }, [isLoading, selectTypes, appStore.currentCity])

  function getFilteredCurrentData(types: string[], city: string) {

    if (types.length === 0) {
      return getEventsFilterByCity(data.result, city)
    }

    const dataFilteredByTypes = data.result.filter((event: Event) => {
      return event.types.some(x => types.includes(x))
    })

    return getEventsFilterByCity(dataFilteredByTypes, city)
  }



  const isMobile = useMedia("(max-width: 768px)");

  function render(eventInfo: any) {
    return (
      <div
        className={`cursor-pointer md:truncate relative`}
        onClick={() => {
          setSelectEvent({
            ...eventInfo.event.extendedProps,
            title: eventInfo.event.title,
          });
          open();
        }}
      >
        {eventInfo.event.extendedProps.canceled && <div className="absolute w-full h-0.5 bg-slate-500 top-1/2" />}
        <div className="flex gap-1 max-md:gap-1.5 items-center">
          <div className="ml-1 flex gap-0.5 max-md:flex-col">
            {eventInfo.event.extendedProps.types.map((t: string, i: string) => {
              return <div className={`rounded-sm w-3 h-3 ${danceTypeColor(t)}`} key={i} />
            })}
          </div>
          <div className="font-semibold">{eventInfo.event.title}</div>
        </div>
      </div>
    );
  }

  if (error) return <div>failed to load</div>;

  if (isLoading) {
    return (
      <div className="w-full h-[70dvh] flex justify-center items-center">
        <Loading />
      </div>
    )
  }

  return (
    <>
      <Title
        enTitle='Events Calendar'
        chTitle="活動日曆"
      />
      <EventModal opened={opened} onClose={close} data={selectEvent} />
      <div className="flex flex-wrap gap-x-2 gap-y-2 mb-6 text-sm">
        {danceTypes.map(t => {
          return (
            <div
              key={t}
              className={`cursor-pointer border-dashed border-gray-300 border-2 rounded-2xl px-3 py-1 flex justify-start items-center gap-1 md:hover:bg-gray-100 ${selectTypes.includes(t) ? 'bg-gray-100' : 'bg-transparent'}`}
              onClick={() => {
                if (selectTypes.find(types => types === t)) {
                  const result = selectTypes.filter(types => types !== t)
                  setSelectTypes(result)
                } else {
                  const result = selectTypes.concat([t])
                  setSelectTypes(result)
                }
              }}
            >
              <div className={`rounded-sm w-3 h-3 ${danceTypeColor(t)}`} />{t}
            </div>)
        })}
      </div>
      {selectTypes.length !== 0 && <div className="-mt-3 mb-8 font-bold">目前顯示：{selectTypes.join('、')}</div>}
      {isMobile && <MobileCalendar data={currentData} render={render} />}
      {!isMobile && <DesktopCalendar data={currentData} render={render} />}
    </>
  );
}

function MobileCalendar({ data, render }: { data: Array<Event>, render: any }) {
  return (
    <FullCalendar
      height="auto"
      plugins={[listPlugin]}
      validRange={(nowDate) => {
        return {
          start: nowDate,
        };
      }}
      initialView="listMonth"
      events={data.map((e) => ({
        ...e,
        start: dayjs(e.date).format(`YYYY-MM-DDT${e.startAt}`),
        eventDate: e.date,
      }))}
      eventContent={render}
    />
  );
}

function DesktopCalendar({ data, render }: { data: Array<Event>, render: any }) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      validRange={(nowDate) => {
        return {
          start: dayjs(nowDate).toDate(),
        };
      }}
      initialView="dayGridMonth"
      events={data.map((e) => ({
        ...e,
        start: dayjs(e.date).format("YYYY-MM-DDT00:00"),
        eventDate: e.date,
      }))}
      eventContent={render}
    />
  );
}
