import { locateList } from "@/const/locate";
import { Event } from "@/types/event";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrAfter"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export function getLatestWeekEvents(events: Array<Event>) {
    const weekEvents = events.filter((event: Event) => {
        return (
            dayjs(event.date).isSameOrBefore(dayjs().add(6, "d"), 'day') &&
            dayjs(event.date).isSameOrAfter(dayjs(), 'day')
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

export function getCurrentWeekEvents(events: Array<Event>) {
    const weekEvents = events.filter((event: Event) => {
        return (
            dayjs(event.date).isSameOrAfter(dayjs().startOf('w')) &&
            dayjs(event.date).isSameOrBefore(dayjs().endOf('w'))
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

export function getEventsFilterByCity(events: Array<Event>, city: string) {
    return events.filter((event: Event) => {
        const eventCity = locateList.find(x => x.id === event.locate)
        return eventCity?.city === city
    })
}