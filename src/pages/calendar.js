import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import dayjs from "dayjs";
import eventsJson from "../events.json";
import { getStaticEvents } from "@/utils/getStaticEvents";

// const staticEvents =

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
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        defaultAllDay
        events={eventsData.map((e) => ({
          ...e,
          start: dayjs(e.start).format("YYYY-MM-DDThh:mm:ss"),
          content: "hello",
        }))}
        eventContent={renderEventContent}
      />
    </div>
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
