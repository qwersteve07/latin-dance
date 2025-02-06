import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { Button } from '@mantine/core';
import { useRouter } from 'next/router';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export default function Home() {
  const [currentWeekData, setCurrentWeekData] = useState([]);
  const { data, error, isLoading } = useSWR('/latin-dance/events', fetcher);
  const router = useRouter();

  useEffect(() => {
    console.log(data);
    if (!data) return;

    setCurrentWeekData(() => {
      const events = data.result.filter(d => {
        return (
          dayjs(d.start).isSameOrBefore(dayjs().add(7, 'd')) &&
          dayjs(d.start).isSameOrAfter(dayjs())
        );
      });

      const groupEvents = Object.groupBy(events, ({ start }) => {
        return dayjs(start).format('dddd');
      });

      const sortEvents = Object.entries(groupEvents).sort((a, b) => {
        if (dayjs(a[1][0].start).isBefore(b[1][0].start)) {
          return -1;
        } else {
          return 1;
        }
      });

      return sortEvents;
    });
  }, [data]);

  function render(eventInfo) {
    const locateColor = () => {
      switch (eventInfo.event.extendedProps.host) {
        case 'Flow Taipei':
          return 'hover:bg-flow-bg hover:text-flow-text';
        case 'Bailalo Dance Studio':
          return 'bg-bailalo-bg text-bailalo-text';
        case 'La Salsa Taipei':
          return 'bg-lasalsa-bg text-lasalsa-text';
        case 'Copa Taiwan':
          return 'bg-copa-bg text-copa-text';
        case 'Bachata Taiwan':
          return 'bg-barcade-bg text-barcade-text';
        case 'Brass Monkey':
          return 'bg-brass-monkey-bg text-brass-monkey-text';
        default:
          return '';
      }
    };

    return (
      <div
        className={`cursor-pointer md:truncate`}
        onClick={() => {
          setSelectEvent({
            ...eventInfo.event.extendedProps,
            title: eventInfo.event.title,
          });
          open();
        }}
      >
        <b>{eventInfo.event.title}</b>
        <b>{eventInfo.event.title}</b>
      </div>
    );
  }

  if (error) return <div>failed to load</div>;

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1 className="text-center text-4xl font-bold mb-10">台北拉丁舞指南</h1>
      <p className="text-center text-2xl font-bold mb-8">Up Coming Events</p>
      <ul className="flex justify-center items-start">
        {currentWeekData.map(([weekday, events]) => (
          <li key={weekday} className="flex flex-col flex-[1]">
            <div className="font-bold flex justify-between items-center flex-[1] border-b p-4 border-r">
              <span>{weekday.substring(0, 3)}</span>
              <span>{dayjs(events[0].start).format('MM/DD')}</span>
            </div>
            <div className="p-4 border-r h-full">
              {events.map(e => {
                return <div key={e.title}>{e.title}</div>;
              })}
            </div>
          </li>
        ))}
      </ul>
      <div className="text-center my-8">
        <Button variant="outline" onClick={() => router.push('/calendar')}>
          查看更多未來活動
        </Button>
      </div>
    </div>
  );
}
