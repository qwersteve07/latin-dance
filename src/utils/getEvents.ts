import { Event } from "@/types/event";
import dayjs from "dayjs";

export function getLatestWeekEvents(events: Array<Event>) {

    const weekEvents = events.filter((event: Event) => {
        return (
            dayjs(event.date).isSameOrBefore(dayjs().add(7, "d")) &&
            dayjs(event.date).isSameOrAfter(dayjs())
        );
    })

    const eventsGroupByWeekday = Object.groupBy(weekEvents, ({ date }: { date: string }) => {
        return dayjs(date).format("dddd");
    }) as Record<string, Array<Event>>

    const sortEvents = Object.entries(eventsGroupByWeekday).sort((a, b) => {
        if (dayjs(a[1][0].date).isBefore(b[1][0].date)) {
            return -1;
        } else {
            return 1;
        }
    });

    return sortEvents;
}