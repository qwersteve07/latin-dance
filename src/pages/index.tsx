import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { useEffect, useState } from "react";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { InstagramEmbed } from "react-social-media-embed";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useRouter } from "next/router";
import { Event } from "@/types/event";
import { getLatestWeekEvents } from "@/utils/getEvents";
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectEvent, setSelectEvent] = useState<Partial<Event>>({});
  const [latestWeekEvents, setLatestWeekEvents] = useState<[string, Event[]][]>([]);
  const { data, error, isLoading } = useSWR("/latin-dance/events", fetcher);
  const router = useRouter();

  const vlogIGList = [
    {
      name: "NINJA VIDEOZZ TAIWAN",
      url: "https://www.instagram.com/ninjavideozz.taiwan/",
    },
    {
      name: "Social Dance Vlog",
      url: "https://www.instagram.com/socialdancevlog/",
    },
  ];

  useEffect(() => {
    if (!data) return;

    const result = getLatestWeekEvents(data.result)
    setLatestWeekEvents(result)

  }, [data]);

  function EventModal({ opened, onClose, data }: { opened: boolean, onClose: () => void, data: Partial<Event> }) {
    return (
      <Modal
        opened={opened}
        onClose={onClose}
        title={<b>{data.title}</b>}
        centered
      >
        <div>主辦：{data.host}</div>
        <div>地點：{data.locate}</div>
        <div>
          時間：{data.startAt} - {data.endAt}
        </div>
        <div>費用：{data.fee}</div>
        <div>比例：{data.rate}</div>
      </Modal>
    );
  }

  if (error) return <div>failed to load</div>;

  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <EventModal opened={opened} onClose={close} data={selectEvent} />
      <section>
        <div className="mt-6 mb-20 max-md:mt-2 max-md:mb-10">
          <h1 className="text-center text-5xl font-bold mb-6 max-md:text-4xl max-md:mb-3">
            <div className="mb-6">💃🕺</div>
            <div>台北拉丁舞指南</div>
          </h1>
          <p className="text-center text-xl">Let&apos;s dance!</p>
        </div>
        <h3 className="text-center text-2xl font-bold mb-12 max-md:mb-8">
          Up Coming Events
        </h3>
        <ul className="flex justify-center items-start gap-5 w-full max-md:flex-col">
          {latestWeekEvents.map(([weekday, events]) => (
            <li key={weekday} className="flex flex-col flex-[1] max-md:w-full">
              <div className="font-bold flex justify-between items-center mb-4 gap-4">
                <span>{dayjs(events[0].start).format("MM/DD")}</span>
                <span
                  className={
                    weekday === "Saturday" || weekday === "Sunday"
                      ? "text-red-500"
                      : "text-black"
                  }
                >
                  {weekday.substring(0, 3)}
                </span>
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
                      {e.title}
                    </div>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
        <div className="text-center my-8">
          <Button variant="outline" onClick={() => router.push("/calendar")}>
            查看更多未來活動
          </Button>
        </div>
      </section>
      <hr className="w-20 mx-auto my-16" />
      <section>
        <h3 className="text-center text-2xl font-bold mb-8">精彩活動花絮</h3>
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
