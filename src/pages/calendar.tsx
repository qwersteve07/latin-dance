import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction"
import { useMedia } from "react-use";
import { useDisclosure } from "@mantine/hooks";
import { Button } from "@mantine/core"
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { Event, EventWithEventDate } from "@/types/event";
import EventModal from "@/components/eventModal";
import Title from "@/components/title";
import { danceTypes } from "@/const/dance-types";
import { useAppStore } from "@/store/appStore";
import { getEventsFilterByCity } from "@/utils/getEvents";
import { useDay } from "@/use/use-day";
import { NextSeo } from "next-seo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Announcement from "@/components/announce";
import DeleteEventModal from "@/components/deleteModal";
import EventEditModal from "@/components/EventEditModal";
import { useUser } from "@/use/use-user";
import DanceTypeCube from "@/components/danceTypeCube";
import DanceTypeBadge from "@/components/danceTypeBadge";
import { DanceType } from "@/types/danceTypes";

export default function Calendar() {
  const [currentYear, setCurrentYear] = useState('2026')
  const [currentMonth, setCurrentMonth] = useState('1')
  const [eventModalOpened, { open: openEventModal, close: closeEventModal }] = useDisclosure(false);
  const [eventEditModalOpened, { open: openEventEditModal, close: closeEventEditModal }] = useDisclosure(false);
  const [deleteEventModalOpened, { open: openDeleteEventModal, close: closeDeleteEventModal }] = useDisclosure(false);
  const [selectEvent, setSelectEvent] = useState<Partial<EventWithEventDate>>({});
  const { data, error, isLoading } = useSWR(`/social-dance/events?year=${currentYear}&month=${currentMonth}`, fetcher);
  const [currentData, setCurrentData] = useState<Array<Event>>([])
  const [selectTypes, setSelectTypes] = useState<string[]>([]);
  const appStore = useAppStore()
  const dayjs = useDay()
  const { t } = useTranslation('common')
  const [eventId, setEventId] = useState('')
  const [defaultDate, setDefaultDate] = useState('')
  const { isLogin } = useUser()


  useEffect(() => {
    if (isLoading) return;
    if (!data?.result) return;
    if (!appStore.currentCity) return;

    let result;
    if (selectTypes.length === 0) {
      result = getFilteredCurrentData([], appStore.currentCity);
    } else {
      result = getFilteredCurrentData(selectTypes, appStore.currentCity);
    }

    setCurrentData(result);
  }, [isLoading, selectTypes, appStore.currentCity, data?.result]);

  function getFilteredCurrentData(types: string[], city: string) {
    if (types.length === 0) {
      return getEventsFilterByCity(data.result, city);
    }

    const dataFilteredByTypes = data.result.filter((event: Event) => {
      return event.types.some(x => types.includes(x));
    });

    return getEventsFilterByCity(dataFilteredByTypes, city);
  }

  const isMobile = useMedia("(max-width: 768px)");

  function render(eventInfo: any) {
    return (
      <div
        className={`cursor-pointer md:truncate relative ${dayjs(eventInfo.event.extendedProps.eventDate).isBefore(
          dayjs(),
          "day"
        )
          ? "opacity-20"
          : ""
          }`}
        onClick={() => {
          setSelectEvent({
            ...eventInfo.event.extendedProps,
            id: eventInfo.event.id,
            title: eventInfo.event.title,
          });
          openEventModal();
        }}
      >
        {eventInfo.event.extendedProps.canceled && (
          <div className="absolute w-full h-0.5 bg-text-main top-1/2" />
        )}
        <div className="flex gap-1 max-md:gap-1.5 items-center">
          <div className="ml-1 flex gap-0.5 max-md:flex-col">
            {eventInfo.event.extendedProps.types.map((t: DanceType, i: string) => {
              return <DanceTypeCube type={t} key={i} />;
            })}
          </div>
          <div className="font-semibold">{eventInfo.event.title}</div>
        </div>
      </div>
    );
  }

  function onOpenAddEventModal(date: any) {
    if (!isLogin) return
    setDefaultDate(date.dateStr)
    openEventEditModal()
  }

  function handleOpenEventEditModal(id: string) {
    openEventEditModal()
    setEventId(id)
  }

  function handleCloseEventEditModal() {
    closeEventEditModal()
    closeEventModal()
    setEventId('')
  }

  async function onDeleteEvent() {
    try {
      await fetcher(`/social-dance/events/${selectEvent.id}`, {
        method: 'delete',
      })
      closeDeleteEventModal()
      closeEventModal()
    } catch (e) {
      console.log(e)
    }
  };


  const Content = () => {
    if (error) return <div>{t("load_data_failed")}</div>;

    return (
      <>
        <DeleteEventModal opened={deleteEventModalOpened} onClose={closeDeleteEventModal} onDelete={onDeleteEvent} />
        <EventModal opened={eventModalOpened} onClose={closeEventModal} data={selectEvent} onOpenEditModal={handleOpenEventEditModal} onOpenDeleteModal={openDeleteEventModal} />
        <EventEditModal opened={eventEditModalOpened} onClose={handleCloseEventEditModal} id={eventId} defaultDate={defaultDate} />
        <div className="flex flex-wrap gap-x-2 gap-y-2 mb-6 text-sm">
          {danceTypes.map(t => {
            return (
              <DanceTypeBadge
                key={t}
                type={t}
                className={`cursor-pointer border-dashed md:hover:bg-background-sub ${selectTypes.includes(t)
                  ? "bg-background-sub"
                  : "bg-transparent"
                  }`}
                onClick={() => {
                  if (selectTypes.find(types => types === t)) {
                    const result = selectTypes.filter(types => types !== t);
                    setSelectTypes(result);
                  } else {
                    const result = selectTypes.concat([t]);
                    setSelectTypes(result);
                  }
                }}
              />
            );
          })}
        </div>
        {isMobile && <MobileCalendar data={currentData} render={render} setCurrentYear={setCurrentYear} setCurrentMonth={setCurrentMonth} />}
        {!isMobile && <DesktopCalendar data={currentData} render={render} setCurrentYear={setCurrentYear} setCurrentMonth={setCurrentMonth} onOpenAddEventModal={onOpenAddEventModal} />}
      </>
    );
  };

  return (
    <>
      <NextSeo
        title={`${t("title")} | ${t("calendar.title")}`}
        description={t("calendar.description")}
        openGraph={{
          type: "website",
          url: "http://social-dance.tw/calendar",
          siteName: `${t("title")} | ${t("calendar.title")}`,
          description: t("calendar.description"),
        }}
      />
      <div className="flex justify-between items-center">
        <Title>{t('calendar.page_title')}</Title>
        {isLogin && <Button className="!w-20 mb-8" onClick={() => {
          onOpenAddEventModal({ dateStr: dayjs().format('YYYY-MM-DD') })
        }}>新增</Button>}
      </div>
      {appStore.currentCity === 'taichung' && (
        <Announcement>
          {t("contact_w_social")}&nbsp;
          <a
            className="font-bold underline"
            target="_blank"
            href="https://ig.me/m/wsocial_taichung"
          >
            W Social
          </a>
          ！
        </Announcement>
      )}
      {Content()}
    </>
  );
}

function MobileCalendar({ data, render, setCurrentYear, setCurrentMonth }: { data: Array<Event>, render: any, setCurrentYear: any, setCurrentMonth: any }) {
  const dayjs = useDay()

  return (
    <FullCalendar
      height="auto"
      plugins={[listPlugin]}
      validRange={() => {
        return {
          start: dayjs().startOf("day").format("YYYY-MM-DDT00:00:00"),
        };
      }}
      datesSet={data => {
        const currentDate = dayjs(data.view.currentStart);
        const year = currentDate.year();
        const month = currentDate.month() + 1;
        setCurrentYear(year);
        setCurrentMonth(month);
      }}
      initialView="listMonth"
      events={data.map(e => ({
        ...e,
        start: dayjs(e.date).format(`YYYY-MM-DDT${e.startAt}`),
        eventDate: e.date,
      }))}
      eventContent={render}
      listDaySideFormat={{
        weekday: 'short',
      }}
      listDayFormat={{
        month: "2-digit",
        day: "2-digit"
      }}
    />
  );
}

function DesktopCalendar({ data, render, setCurrentYear, setCurrentMonth, onOpenAddEventModal }: { data: Array<Event>, render: any, setCurrentYear: any, setCurrentMonth: any, onOpenAddEventModal: any }) {
  const dayjs = useDay()

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      weekNumberCalculation="ISO"
      initialView="dayGridMonth"
      datesSet={data => {
        const currentDate = dayjs(data.view.currentStart);
        const year = currentDate.year();
        const month = currentDate.month() + 1;
        setCurrentYear(year);
        setCurrentMonth(month);
      }}
      dateClick={onOpenAddEventModal}
      events={data.map((e) => ({
        ...e,
        start: dayjs(e.date).format("YYYY-MM-DDT00:00"),
        eventDate: e.date,
      }))}
      eventContent={render}
      height="auto"
    />
  );
}

export async function getServerSideProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
