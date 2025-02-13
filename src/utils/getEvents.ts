import { Event } from "@/types/event";
import dayjs from "dayjs";

export function getLatestWeekEvents(events: Array<Event>) {

    const weekEvents = events.filter((event: Event) => {
        return (
            dayjs(event.start).isSameOrBefore(dayjs().add(7, "d")) &&
            dayjs(event.start).isSameOrAfter(dayjs())
        );
    })

    const eventsGroupByWeekday = Object.groupBy(weekEvents, ({ start }: { start: string }) => {
        return dayjs(start).format("dddd");
    }) as Record<string, Array<Event>>

    const sortEvents = Object.entries(eventsGroupByWeekday).sort((a, b) => {
        if (dayjs(a[1][0].start).isBefore(b[1][0].start)) {
            return -1;
        } else {
            return 1;
        }
    });

    return sortEvents;

}