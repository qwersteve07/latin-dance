import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { InstagramEmbed } from "react-social-media-embed";
import { useRouter } from "next/router";
import { Event, EventWithEventDate } from "@/types/event";
import { getCurrentWeekEvents, getEventsFilterByCity } from "@/utils/getEvents";
import EventModal from "@/components/eventModal";
import { danceTypeColor } from "./calendar";
import Loading from "@/components/loading";
import { useAppStore } from "@/store/appStore";
import { useDay } from "@/use/use-day";

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectEvent, setSelectEvent] = useState<Partial<EventWithEventDate>>({});
  const [currentWeekEvents, setCurrentWeekEvents] = useState<[string, Event[]][]>([]);
  const { data, error, isLoading } = useSWR("/social-dance/events", fetcher);
  const router = useRouter();
  const appStore = useAppStore()

  const vlogIGList = [
    {
      name: "Ninja Videozz Taiwan",
      url: "https://www.instagram.com/ninjavideozz.taiwan/",
    },
    {
      name: "Social Dance Vlog",
      url: "https://www.instagram.com/socialdancevlog/",
    },
    {
      name: "Tyra",
      url: "https://www.instagram.com/tyrarara0830",
    },
    {
      name: "Jim",
      url: "https://www.instagram.com/jimframe",
    },
  ];

  useEffect(() => {
    if (!data) return;

    const filteredData = getEventsFilterByCity(data.result, appStore.currentCity)

    const result = getCurrentWeekEvents(filteredData)
    setCurrentWeekEvents(result)

  }, [data, appStore.currentCity]);



  const Content = () => {
    if (error) return <div className="text-center">讀取活動失敗，可能發生一些問題😭請等我修復...</div>;

    if (isLoading) {
      return (
        <div className="w-full h-[70dvh] flex justify-center items-center">
          <Loading />
        </div>
      )
    }

    return (
      <>
        <MobileEvents events={currentWeekEvents} setSelectEvent={setSelectEvent} open={open} />
        <DesktopEvents events={currentWeekEvents} setSelectEvent={setSelectEvent} open={open} />
        <div className="text-center my-8">
          <Button variant="outline" onClick={() => router.push("/calendar")}>
            Check More Events!
          </Button>
        </div>
      </>
    )
  }

  return (
    <div>
      <EventModal opened={opened} onClose={close} data={selectEvent} />
      <section>
        <div className="mt-6 mb-20 max-md:mt-2 max-md:mb-12">
          <h1 className="text-center text-5xl font-bold mb-2 max-md:text-3xl">
            <div className="mb-4">💃🕺</div>
            <div>Taiwan Social Dance Guide</div>
          </h1>
          <h2 className="text-center text-3xl font-bold max-md:text-2xl">台灣社交舞指南</h2>
        </div>
        <Content />

      </section>
      <hr className="w-20 mx-auto my-16 border-t-border-main" />
      <section>
        <h3 className="text-center text-2xl font-bold mb-8">Highlights</h3>
        <div className="flex justify-center items-center gap-4 flex-wrap w-[80%] max-xl:w-[90%] mx-auto max-md:w-full max-md:flex-col">
          {vlogIGList.map(item => {
            return (
              <div key={item.name}>
                <InstagramEmbed url={item.url} width={328} />
              </div>
            );
          })}
        </div>
      </section>
    </div >
  );
}

const MobileEvents = ({ events, setSelectEvent, open }: { events: [string, Event[]][], setSelectEvent: (p: any) => void, open: () => void }) => {
  const dayjs = useDay()

  const filteredEvents = events.filter(([weekday]) => {
    return weekday === dayjs().format('dddd')
  })
  return (
    <div className="hidden max-md:block">
      <Title>Today&lsquo;s Events in <City /></Title>
      {filteredEvents.length === 0 && <NoEvents>No Social Dance today... 🥲</NoEvents>}
      {filteredEvents.length !== 0 && (<ul className="flex justify-center items-start gap-5 w-full flex-col">
        {filteredEvents.map(([weekday, events]) => {
          return (
            <li key={weekday} className="flex flex-col flex-[1] w-full">
              <EventsGroupDay weekday={weekday} day={events[0].date} />
              <div className="h-full">
                {events.map(e => {
                  return <EventItem key={e.title} event={e} setSelectEvent={setSelectEvent} open={open} />
                })}
              </div>
            </li>
          )
        })}
      </ul>)}
    </div>
  )
}

const DesktopEvents = ({ events, setSelectEvent, open }: { events: [string, Event[]][], setSelectEvent: (p: any) => void, open: () => void }) => {
  return (
    <div className="max-md:hidden">
      <Title>Events This Week in <City /></Title>
      {events.length === 0 && <NoEvents>No Social Dance this week... 🥲</NoEvents>}
      {events.length !== 0 && (<ul className="flex justify-center items-start gap-5 w-full">
        {events.map(([weekday, events]) => {
          return (
            <li key={weekday} className="flex flex-col flex-[1] max-w-[200px]">
              <EventsGroupDay weekday={weekday} day={events[0].date} />
              <div className="h-full">
                {events.map(e => {
                  return <EventItem key={e.title} event={e} setSelectEvent={setSelectEvent} open={open} />
                })}
              </div>
            </li>
          )
        })}
      </ul>)}
    </div>
  )
}

const Title = ({ children }: { children: ReactNode }) => {
  return <h3 className="text-center text-2xl font-bold mb-8">
    {children}
  </h3>
}

const NoEvents = ({ children }: { children: ReactNode }) => {
  return <div className="text-lg text-center">{children}</div>
}

const City = () => {
  const appStore = useAppStore()
  return (
    <span className="border-b-4 border-red-500 px-1">{appStore.currentCity.split('').map((t, i) => {
      return i === 0 ? t.toUpperCase() : t
    }).join('')}</span>
  )
}

const EventsGroupDay = ({ weekday, day }: { weekday: string, day: string }) => {
  const dayjs = useDay()

  return (
    <div className={`
      font-bold mb-2 gap-2 p-2 rounded-xl text-text-main bg-background-sub
      flex justify-start items-center relative`}>
      <span>{weekday.substring(0, 3)}</span>
      <span>{dayjs(day).format("MM/DD")}</span>
      {weekday === dayjs().format('dddd') && <span className="absolute top-4 right-3 w-2 h-2 rounded-full bg-red-500" />}
    </div>
  )
}

const EventItem = ({ event, setSelectEvent, open }: { event: Event, setSelectEvent: (p: any) => void, open: () => void }) => {
  const dayjs = useDay()
  return (
    <div
      className={`cursor-pointer p-2 rounded-xl border border-border-main mb-2 hover:bg-background-third transition
       ${dayjs(event.date).isBefore(dayjs(), 'day') ? 'opacity-30' : ''}
      `}
      onClick={() => {
        setSelectEvent({
          ...event,
          title: event.title,
        });
        open();
      }}
    >
      <div className="flex items-start gap-2 font-semibold" style={{ 'wordBreak': 'break-word' }}>
        <div className="flex gap-1 mt-[6px]">
          {event.types.map(t => <div className={`rounded-sm w-3 h-3 ${danceTypeColor(t)}`} key={t} />)}
        </div>
        <div className={`${event.canceled ? 'line-through' : ''}`}>
          {event.title}
        </div>
      </div>
    </div>
  )
}