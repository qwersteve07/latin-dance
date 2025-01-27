import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import dayjs from "dayjs";
import eventsJson from "../events.json";
import { getStaticEvents } from "@/utils/getStaticEvents";
import { useMedia } from "react-use";

export default function Calendar() {
  const flowMiniSocialList = getStaticEvents("flow mini social", 1);
  const BrassMonkeyList = getStaticEvents("Brass Monkey", 2);
  const BarcadeList = getStaticEvents("Barcade ", 4);
  const FlowSocial = getStaticEvents("Flow Social Party ", 5);
  const CopaSocial = getStaticEvents("Copa Social Party", 5);
  const LasalsaSocial = getStaticEvents("Lasalsa Social Party", 6);
  const staticEvents = [
    flowMiniSocialList,
    BrassMonkeyList,
    BarcadeList,
    FlowSocial,
    CopaSocial,
    LasalsaSocial,
  ];
  const eventsData = eventsJson.concat(...staticEvents);
  const isMobile = useMedia("(max-width: 768px)");

  return (
    <>
      {isMobile && <MobileCalendar data={eventsData} />}
      {!isMobile && <DesktopCalendar data={eventsData} />}
    </>
  );
}

function MobileCalendar({ data }) {
  return (
    <FullCalendar
      height="auto"
      plugins={[listPlugin]}
      initialView="listMonth"
      defaultAllDay
      events={data.map((e) => ({
        ...e,
        start: dayjs(e.start).format("YYYY-MM-DDThh:mm:ss"),
      }))}
      eventContent={renderEventContent}
    />
  );
}

function DesktopCalendar({ data }) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      defaultAllDay
      events={data.map((e) => ({
        ...e,
        start: dayjs(e.start).format("YYYY-MM-DDThh:mm:ss"),
      }))}
      eventContent={renderEventContent}
    />
  );
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <div onClick={() => console.log(eventInfo)}>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </div>
  );
}
