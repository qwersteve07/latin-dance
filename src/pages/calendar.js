import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import dayjs from "dayjs";
import { useMedia } from "react-use";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

export default function Calendar() {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectEvent, setSelectEvent] = useState({});
  const { data, error, isLoading } = useSWR("/latin-dance/events", fetcher);

  const isMobile = useMedia("(max-width: 768px)");

  function render(eventInfo) {
    const locateColor = () => {
      switch (eventInfo.event.extendedProps.host) {
        case "Flow Taipei":
          return "bg-flow-bg text-flow-text";
        case "Bailalo Dance Studio":
          return "bg-bailalo-bg text-bailalo-text";
        case "La Salsa Taipei":
          return "bg-lasalsa-bg text-lasalsa-text";
        case "Copa Taiwan":
          return "bg-copa-bg text-copa-text";
        case "Bachata Taiwan":
          return "bg-barcade-bg text-barcade-text";
        case "Brass Monkey":
          return "bg-brass-monkey-bg text-brass-monkey-text";
        default:
          return "";
      }
    };
    return (
      <div
        className={`cursor-pointer overflow-auto ${locateColor()}`}
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

function EventModal({ opened, onClose, data }) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<b>{data.title}</b>}
      centered
    >
      <div>主辦：{data.host}</div>
      <div>地點：{data.locate}</div>
      <div>費用：{data.fee}</div>
      <div>比例：{data.rate}</div>
    </Modal>
  );
}

function MobileCalendar({ data, render }) {
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
        start: dayjs(e.start).format("YYYY-MM-DDThh:mm:ss"),
      }))}
      eventContent={render}
    />
  );
}

function DesktopCalendar({ data, render }) {
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
        start: dayjs(e.start).format("YYYY-MM-DDThh:mm:ss"),
      }))}
      eventContent={render}
    />
  );
}
