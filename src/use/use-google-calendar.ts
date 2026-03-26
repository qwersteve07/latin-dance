import ApiCalendar from "react-google-calendar-api";
import { gapi } from "gapi-script";

const useGoogleCalendar = () => {
  const config = {
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID || "",
    apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
    scope: "https://www.googleapis.com/auth/calendar",
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
    ],
  };

  const apiCalendar = new ApiCalendar(config);

  const calendarId =
    "3d8ccbb133997fe98403f4e4b5f0bf5471226005685e3014b64b260c535f5bfb%40group.calendar.google.com/public/basic.ics";

  apiCalendar.setCalendar(calendarId);

  const insertEvent = () => {
    const eventData = {
      summary: "Event With Google Meet Conference",
      start: {
        dateTime: new Date().toISOString(),
        timeZone: "Asia/Taipei",
      },
      end: {
        dateTime: new Date(new Date().getTime() + 3600000).toISOString(),
        timeZone: "Asia/Taipei",
      },
    };

    apiCalendar
      .createEvent(eventData)
      .then((result: object) => {
        console.log(result);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const deleteEvent = () => {};
  return { insertEvent, deleteEvent };
};

export default useGoogleCalendar;
