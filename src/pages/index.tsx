import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { InstagramEmbed } from "react-social-media-embed";
import { useRouter } from "next/router";
import { Event, EventWithEventDate } from "@/types/event";
import { getEventsFilterByCity, getLatestWeekEvents } from "@/utils/getEvents";
import EventModal from "@/components/eventModal";
import { danceTypeColor } from "./calendar";
import Loading from "@/components/loading";
import { useAppStore } from "@/store/appStore";
import { useDay } from "@/use/use-day";

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectEvent, setSelectEvent] = useState<Partial<EventWithEventDate>>({});
  const [latestWeekEvents, setLatestWeekEvents] = useState<[string, Event[]][]>([]);
  const { data, error, isLoading } = useSWR("/social-dance/events", fetcher);
  const router = useRouter();
  const appStore = useAppStore()
  const dayjs = useDay()

  const vlogIGList = [
    {
      name: "Ninja Videozz Taiwan",
      url: "https://www.instagram.com/ninjavideozz.taiwan/",
    },
    {
      name: "Social Dance Vlog",
      url: "https://www.instagram.com/socialdancevlog/",
    },
  ];

  useEffect(() => {
    if (!data) return;

    const filteredData = getEventsFilterByCity(data.result, appStore.currentCity)

    const result = getLatestWeekEvents(filteredData)
    setLatestWeekEvents(result)

  }, [data, appStore.currentCity]);

  if (error) return <div>failed to load</div>;

  if (isLoading) {
    return (
      <div className="w-full h-[70dvh] flex justify-center items-center">
        <Loading />
      </div>
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
        <h3 className="text-center text-2xl font-bold mb-12 max-md:mb-8">
          Events This Week in <span className="border-b-4 border-red-500 px-1">{appStore.currentCity.split('').map((t, i) => {
            return i === 0 ? t.toUpperCase() : t
          }).join('')}</span>
        </h3>
        {latestWeekEvents.length === 0 && <div className="text-lg text-center">No Social Dance this week... 🥲</div>}
        {latestWeekEvents.length !== 0 && (<ul className="flex justify-center items-start gap-5 w-full max-md:flex-col">
          {latestWeekEvents.map(([weekday, events]) => (
            <li key={weekday} className="flex flex-col flex-[1] max-md:w-full max-w-[200px]">
              <div className={`
              font-bold mb-2 gap-2 p-2 rounded-xl bg-gray-100
              flex justify-start items-center ${weekday === "Saturday" || weekday === "Sunday"
                  ? "text-red-500"
                  : "text-black"}`}>
                <span>{weekday.substring(0, 3)}</span>
                <span >{dayjs(events[0].date).format("MM/DD")}</span>
              </div>
              <div className="h-full">
                {events.map(e => {
                  return (
                    <div
                      key={e.title}
                      className={`cursor-pointer p-2 rounded-xl border mb-2 hover:bg-gray-50`}
                      onClick={() => {
                        setSelectEvent({
                          ...e,
                          title: e.title,
                        });
                        open();
                      }}
                    >
                      <div className="flex items-start gap-2 font-semibold" style={{ 'wordBreak': 'break-word' }}>
                        <div className="flex gap-1 mt-[6px]">
                          {e.types.map(t => <div className={`rounded-sm w-3 h-3 ${danceTypeColor(t)}`} key={t} />)}
                        </div>
                        <div className={`${e.canceled ? 'line-through' : ''}`}>
                          {e.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>)}
        <div className="text-center my-8">
          <Button variant="outline" onClick={() => router.push("/calendar")}>
            Check More Events!
          </Button>
        </div>
      </section>
      <hr className="w-20 mx-auto my-16" />
      <section>
        <h3 className="text-center text-2xl font-bold mb-8">Highlights</h3>
        <div className="flex justify-center items-center gap-4 max-md:flex-col">
          {vlogIGList.map(item => {
            return (
              <div key={item.name}>
                <div className="text-center mb-4 font-bold text-xl">
                  {item.name}
                </div>
                <InstagramEmbed url={item.url} width={328} />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
