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
        <b>{eventInfo.event.title}</b>
      </div>
    );
  }

  if (error) return <div>failed to load</div>;

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <EventModal opened={opened} onClose={close} data={selectEvent} />
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
        end: '',
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
          start: nowDate,
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
