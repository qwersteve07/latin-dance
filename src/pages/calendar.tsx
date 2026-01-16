import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { useMedia } from "react-use";
import { useDisclosure } from "@mantine/hooks";
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
import DanceTypeCube from "@/components/danceTypeCube";
import DanceTypeBadge from "@/components/danceTypeBadge";
import { DanceType } from "@/types/danceTypes";

export default function Calendar() {
  const [currentYear, setCurrentYear] = useState("2026");
  const [currentMonth, setCurrentMonth] = useState("1");
  const [opened, { open, close }] = useDisclosure(false);
  const [selectEvent, setSelectEvent] = useState<Partial<EventWithEventDate>>(
    {}
  );
  const { data, error, isLoading } = useSWR(
    `/social-dance/events?year=${currentYear}&month=${currentMonth}`,
    fetcher
  );
  const [currentData, setCurrentData] = useState<Array<Event>>([]);
  const [selectTypes, setSelectTypes] = useState<string[]>([]);
  const appStore = useAppStore();
  const dayjs = useDay();
  const { t } = useTranslation("common");

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
            title: eventInfo.event.title,
          });
          open();
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

  const Content = () => {
    if (error) return <div>{t("load_data_failed")}</div>;

    return (
      <>
        <EventModal opened={opened} onClose={close} data={selectEvent} />
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
        {isMobile && (
          <MobileCalendar
            data={currentData}
            render={render}
            setCurrentYear={setCurrentYear}
            setCurrentMonth={setCurrentMonth}
          />
        )}
        {!isMobile && (
          <DesktopCalendar
            data={currentData}
            render={render}
            setCurrentYear={setCurrentYear}
            setCurrentMonth={setCurrentMonth}
          />
        )}
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
      <Title>{t("calendar.page_title")}</Title>
      {appStore.currentCity === "taichung" && (
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

function MobileCalendar({
  data,
  render,
  setCurrentYear,
  setCurrentMonth,
}: {
  data: Array<Event>;
  render: any;
  setCurrentYear: any;
  setCurrentMonth: any;
}) {
  const dayjs = useDay();
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
    />
  );
}

function DesktopCalendar({
  data,
  render,
  setCurrentYear,
  setCurrentMonth,
}: {
  data: Array<Event>;
  render: any;
  setCurrentYear: any;
  setCurrentMonth: any;
}) {
  const dayjs = useDay();
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      weekNumberCalculation="ISO"
      initialView="dayGridMonth"
      datesSet={data => {
        const currentDate = dayjs(data.view.currentStart);
        const year = currentDate.year();
        const month = currentDate.month() + 1;
        setCurrentYear(year);
        setCurrentMonth(month);
      }}
      events={data.map(e => ({
        ...e,
        start: dayjs(e.date).format("YYYY-MM-DDT00:00"),
        eventDate: e.date,
      }))}
      eventContent={render}
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
