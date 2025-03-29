import { Burger, Drawer, Select } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDisclosure } from '@mantine/hooks';
import { citiesList } from "@/const/cities";
import { useAppStore } from "@/store/appStore";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";

export default function Navigator() {
  const { t } = useTranslation('common')

  const routesList = [
    { id: "/calendar", name: t("calendar.title") },
    { id: "/organizers", name: t("organizers.title") },
    { id: "/guides", name: t("guides.title") },
    { id: "/food-map", name: t("food_map.title") },
    { id: "/others", name: t("others.title") },
  ];

  const router = useRouter();
  const { pathname, asPath, query } = router
  const [opened, { open, close, toggle }] = useDisclosure(false);
  const appStore = useAppStore()
  const [cookies, setCookie] = useCookies(['NEXT_LOCALE']);
  const [currentLocale, setCurrentLocale] = useState('tw')

  useEffect(() => {
    setCurrentLocale(!cookies['NEXT_LOCALE'] || cookies.NEXT_LOCALE === 'tw' ? 'tw' : 'en')
  }, [])

  const Routes = () => {
    return routesList.map(r => {
      return router.pathname === r.id ?
        (
          <div key={r.id} className="h-7 font-bold text-red-500 pointer-events-none mx-2">
            <div className="flex justify-start items-center h-7">{r.name}</div>
          </div>
        ) :
        (
          <Link
            href={r.id}
            key={r.id}
            onClick={close}
            className="h-7 cursor-pointer font-bold hover:text-red-500 transition mx-2"
          >
            <div key={r.id} >
              <div className="flex justify-start items-center h-7">{r.name}</div>
            </div>
          </Link>
        )
    })
  }

  const SelectCity = () => {
    return (
      <Select
        className="w-32 hover:border-red-500"
        defaultValue="taipei"
        value={appStore.currentCity}
        onChange={value => appStore.setCurrentCity(value || '')}
        data={citiesList.map(item => ({
          ...item, value: item.id, label: currentLocale === 'tw' ? item.name : item.id
        }))}
      />
    )
  }

  const SelectLocale = () => {
    return (
      <div
        className="font-bold cursor-pointer border-border-main border flex justify-center items-center h-9 w-12 rounded-sm box-border  hover:text-red-500 hover:border-red-500 transition"
        onClick={() => {
          const newLocalValue = currentLocale === 'tw' ? 'en' : 'tw'
          setCurrentLocale(newLocalValue)
          setCookie('NEXT_LOCALE', newLocalValue)
          router.push({ pathname, query }, asPath, { locale: newLocalValue })
        }}>{currentLocale.toUpperCase()}</div>
    )
  }

  return (
    <>
      <Drawer offset={8} radius="md" size="xs" position="right" opened={opened} onClose={close}>
        <div className="flex justify-center items-start flex-col gap-4 text-xl">
          <Routes />
        </div>
      </Drawer>
      <nav className="fixed top-0 z-10  border-b border-b-border-main w-full backdrop-blur-xl">
        <div className="flex justify-between items-center h-16 container mx-auto px-6 max-w-6xl">
          <div className="text-2xl">
            <Link href="/">💃🕺</Link>
          </div>
          <div className="hidden max-md:flex justify-end items-center gap-2">
            <SelectCity />
            <SelectLocale />
            <Burger className="hidden max-md:block" opened={opened} onClick={() => {
              toggle()
              open()
            }} aria-label="Toggle navigation" />
          </div>
          <div className="flex justify-between items-center max-md:hidden gap-3">
            <Routes />
            <SelectCity />
            <SelectLocale />
          </div>
        </div >
      </nav>
    </>
  );
}