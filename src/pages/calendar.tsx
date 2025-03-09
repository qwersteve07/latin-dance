import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import dayjs from "dayjs";
import { useMedia } from "react-use";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { Event, EventWithEventDate } from "@/types/event";
import EventModal from "@/components/eventModal";
import Title from "@/components/title";
import { danceTypes } from "@/const/dance-types";

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


  const isMobile = useMedia("(max-width: 768px)");

  function render(eventInfo: any) {
    return (
      <div
        className={`cursor-pointer md:truncate`}
        onClick={() => {
          setSelectEvent({
            ...eventInfo.event.extendedProps,
            title: eventInfo.event.title,
          });
          open();
        }}
      >
        <div className="flex gap-1 items-center">
          <div className="ml-1 flex gap-0.5">
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
    return <div>loading...</div>;
  }

  return (
    <>
      <Title
        enTitle='Events Calendar'
        chTitle="活動日曆"
      />
      <EventModal opened={opened} onClose={close} data={selectEvent} />
      <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
        {danceTypes.map(t => {
          return <div key={t} className="flex justify-start items-center gap-1"><div className={`rounded-sm w-3 h-3 ${danceTypeColor(t)}`} />{t}</div>
        })}
      </div>
      {isMobile && <MobileCalendar data={data.result} render={render} />}
      {!isMobile && <DesktopCalendar data={data.result} render={render} />}
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
