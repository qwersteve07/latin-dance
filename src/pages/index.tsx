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
import Loading from "@/components/loading";
import { useAppStore } from "@/store/appStore";
import { useDay } from "@/use/use-day";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useCookies } from "react-cookie";
import { citiesList } from "@/const/cities";
import { NextSeo } from "next-seo";
import Announcement from "@/components/announce";
import DanceTypeCube from "@/components/danceTypeCube";
import { simpleDanceTypes } from "@/const/dance-types";
import dayjs from "dayjs";
import DanceTypeBadge from "@/components/danceTypeBadge";

export default function Home() {
  const today = dayjs();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectEvent, setSelectEvent] = useState<Partial<EventWithEventDate>>({});
  const [currentWeekEvents, setCurrentWeekEvents] = useState<[string, Event[]][]>([]);
  const { data, error, isLoading } = useSWR(`/social-dance/events?year=${today.year()}&month=${today.month() + 1}`, fetcher);
  const router = useRouter();
  const appStore = useAppStore()
  const { t } = useTranslation('common')

  const vlogIGList = [
    {
      name: "Ninja Videozz Taiwan",
      url: "https://www.instagram.com/ninjavideozz.taiwan/",
    },
    {
      name: "Social Dance Vibe",
      url: "https://www.instagram.com/socialdance_vibe/",
    },
    {
      name: "Sloat Media",
      url: "https://www.instagram.com/sloatmedia",
    },
    {
      name: "Jim",
      url: "https://www.instagram.com/jimframe",
    },
    {
      name: 'Marshall',
      url: 'https://www.instagram.com/marshallstudiotw/'
    }, {
      name: 'Salsa Momentum',
      url: 'https://www.instagram.com/salsa.momentum'
    }
  ];

  useEffect(() => {
    if (!data) return;

    const filteredData = getEventsFilterByCity(data.result, appStore.currentCity)

    const result = getCurrentWeekEvents(filteredData)
    setCurrentWeekEvents(result)

  }, [data, appStore.currentCity]);



  const Content = () => {
    if (error) return <div className="text-center">{t('load_data_failed')}</div>;

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
        <NextSeo
          title={t('title')}
          description={t('description')}
          openGraph={{
            type: 'website',
            url: 'http://social-dance.tw',
            siteName: t('title'),
            description: t('description'),
          }}
        />
        <div className="flex justify-center items-center max-md:flex-col my-8 gap-4 max-md:gap-1">
          <Button className="!w-[200px]" onClick={() => router.push("/calendar")}>
            {t('check_events')}
          </Button>
          <div className="hidden max-md:block">or</div>
          <Button className="!w-[200px]" variant="outline" onClick={() => router.push("/guides")}>
            {t('check_guides')}
          </Button>
        </div>
      </>
    )
  }

  return (
    <div>
      <EventModal opened={opened} onClose={close} data={selectEvent} />
      {appStore.currentCity === 'taichung' && (
        <Announcement>
          {t('contact_w_social')}&nbsp;<a className="font-bold underline" target='_blank' href="https://ig.me/m/wsocial_taichung">W Social</a>！
        </Announcement>)
      }
      <section>
        <div className="mt-6 mb-20 max-md:mt-2 max-md:mb-12">
          <h1 className="text-center text-5xl font-bold max-md:text-4xl">
            <div className="mb-4">💃🕺</div>
            <div>{t('title')}</div>
          </h1>
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-2 text-sm mt-6 max-md:mt-3">
            {simpleDanceTypes.map(t => {
              return <DanceTypeBadge key={t} type={t} />
            })}
          </div>
        </div>
        <Content />
      </section>
      <hr className="w-20 mx-auto my-16 border-t-border-main" />
      <section>
        <h3 className="text-center text-2xl font-bold mb-8">{t('highlights')}</h3>
        <div className="flex justify-center items-center gap-4 flex-wrap max-xl:w-[90%] mx-auto max-md:w-full max-md:flex-col">
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
  const { t } = useTranslation('common')


  const filteredEvents = events.filter(([weekday]) => {
    return weekday === dayjs().format('dddd')
  })
  return (
    <div className="hidden max-md:block">
      <Title>{t('events_today')} in<City /></Title>
      {filteredEvents.length === 0 && <NoEvents>No Social Dance today... 🥲</NoEvents>}
      {filteredEvents.length !== 0 && (<ul className="flex justify-center items-start gap-5 w-full flex-col">
        {filteredEvents.map(([weekday, events]) => {
          const borderStyle = () => {
            const isToday = weekday === dayjs().format('dddd')
            if (isToday) return 'border border-red-500/50  shadow-red-800/30'
            return 'border border-border-third'
          }
          return (
            <li key={weekday} className={`flex flex-col flex-[1] w-full rounded-lg px-2 border ${borderStyle()}`}>
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
  const { t } = useTranslation('common')

  return (
    <div className="max-md:hidden">
      <Title>{t('events_this_week')} in<City /></Title>
      {events.length === 0 && <NoEvents>{t('no_events')}</NoEvents>}
      {events.length !== 0 && (<ul className="flex justify-center items-start gap-3 w-full">
        {events.map(([weekday, events]) => {
          const borderStyle = () => {
            const isToday = weekday === dayjs().format('dddd')
            if (isToday) return 'border border-red-500/50  shadow-red-800/30'
            return 'border border-border-third'
          }
          return (
            <li key={weekday} className={`flex flex-col flex-[1] max-w-[200px] px-2 rounded-xl ${borderStyle()}`}>
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
  return <div className="text-lg text-center border border-border-third p-2 rounded-xl">{children}</div>
}

const City = () => {
  const appStore = useAppStore()
  const [cookies] = useCookies(['NEXT_LOCALE']);
  const currentLocale = !cookies['NEXT_LOCALE'] || cookies.NEXT_LOCALE === 'tw' ? 'tw' : 'en'

  const ChineseName = () => {
    if (appStore.currentCity === 'south-taiwan') return '台南/高雄'
    return citiesList.find((city: any) => city.id === appStore.currentCity)?.name || ''
  }

  const EnglishName = () => {
    if (appStore.currentCity === 'south-taiwan') return 'Tainan/Kaohsiung'
    return appStore.currentCity.split('').map((t, i) => {
      return i === 0 ? t.toUpperCase() : t
    }).join('')
  }

  return (
    <span className="border-b-4 border-red-500 px-1">{currentLocale === 'tw' ? <ChineseName /> : <EnglishName />}</span>
  )
}

const EventsGroupDay = ({ weekday, day }: { weekday: string, day: string }) => {
  const dayjs = useDay()
  const isToday = weekday === dayjs().format('dddd')

  return (
    <div className={`
      font-bold mb-2 gap-2 p-2 rounded-xl text-text-main
      flex justify-between items-end relative 
      }
      ${dayjs(day).isBefore(dayjs(), 'day') ? 'opacity-30' : ''}
      `}>
      <span className={`text-sm text-gray-500 ${isToday && 'text-red-500'}`}>{weekday.substring(0, 3).toUpperCase()}</span>
      <span className={`text-lg text-text-main ${isToday && '!text-red-500'}`}>{dayjs(day).format("MM/DD")}</span>
    </div>
  )
}

const EventItem = ({ event, setSelectEvent, open }: { event: Event, setSelectEvent: (p: any) => void, open: () => void }) => {
  const dayjs = useDay()
  return (
    <div
      className={`cursor-pointer p-2 rounded-xl bg-background-main mb-2 hover:bg-background-third transition
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
      <div className="font-semibold" style={{ 'wordBreak': 'break-word' }}>
        <div className="flex gap-1 mb-1">
          {event.types.map((t: any) => <DanceTypeCube type={t} key={t} />)}
        </div>
        <div className={`${event.canceled ? 'line-through' : ''}`}>
          {event.title}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
      ])),
    },
  }
}