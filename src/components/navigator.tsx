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

type Locale = 'tw' | 'en'
type RouteItem = { id: string; name: string }

const DONATE_URL = 'https://portaly.cc/qwersteve07/support'

export default function Navigator() {
  const { t } = useTranslation('common')

  // 三個群組：找活動 / 新手必讀 / 其他資料。群組之間以分隔線區隔。
  const routeGroups: RouteItem[][] = [
    [
      { id: "/calendar", name: t("calendar.title") },
      { id: "/classes", name: t("classes.title") },
      { id: "/organizers", name: t("organizers.title") },
    ],
    [
      { id: "/beginner", name: t("beginner.title") },
      { id: "/guides", name: t("guides.title") },
    ],
    [
      // { id: "/shop", name: t("shop.title") },
      // { id: "/food-map", name: t("food_map.title") },
      { id: "/others", name: t("others.title") },
    ],
  ];

  const router = useRouter();
  const { pathname, asPath, query } = router
  const [opened, { open, close }] = useDisclosure(false);
  const appStore = useAppStore()
  const [cookies, setCookie] = useCookies(['NEXT_LOCALE']);
  const [currentLocale, setCurrentLocale] = useState<Locale>('tw')

  useEffect(() => {
    setCurrentLocale(!cookies['NEXT_LOCALE'] || cookies.NEXT_LOCALE === 'tw' ? 'tw' : 'en')
  }, [])

  const changeLocale = (locale: Locale) => {
    setCurrentLocale(locale)
    setCookie('NEXT_LOCALE', locale, { path: '/' })
    router.push({ pathname, query }, asPath, { locale })
  }

  const isActive = (id: string) => router.pathname === id

  const renderDrawerLink = (r: RouteItem) => {
    const active = isActive(r.id)
    return (
      <Link
        href={r.id}
        key={r.id}
        onClick={close}
        aria-current={active ? 'page' : undefined}
        className={`relative -mx-2 flex min-h-[52px] items-center rounded-[10px] px-3 text-[17px] font-bold transition ${active ? 'text-red-700 dark:text-red-300' : 'hover:text-red-500'}`}
      >
        {active && (
          <span aria-hidden className="absolute left-0 top-1/2 h-[22px] w-1 -translate-y-1/2 rounded-sm bg-red-600 dark:bg-red-400" />
        )}
        {r.name}
      </Link>
    )
  }

  const renderDesktopLink = (r: RouteItem, groupIndex: number) => {
    const active = isActive(r.id)
    const weight = groupIndex === 0 ? 'text-base font-bold' : 'text-[15px] font-medium text-text-sub'
    return (
      <Link
        href={r.id}
        key={r.id}
        aria-current={active ? 'page' : undefined}
        className={`flex items-center border-b-2 px-3.5 transition ${weight} ${active ? 'border-red-600 !text-red-700 dark:border-red-400 dark:!text-red-300' : 'border-transparent hover:text-red-500'}`}
      >
        {r.name}
      </Link>
    )
  }

  const renderSelectCity = (className: string, withLabel = false) => {
    return (
      <Select
        className={className}
        defaultValue="taipei"
        value={appStore.currentCity}
        onChange={value => appStore.setCurrentCity(value || '')}
        data={citiesList.map(item => ({
          ...item, value: item.id, label: currentLocale === 'tw' ? item.name : item.id
        }))}
        allowDeselect={false}
        aria-label={t('nav.city')}
        {...(withLabel ? {
          leftSection: <span className="text-xs text-text-sub">{t('nav.city')}</span>,
          leftSectionWidth: 52,
          leftSectionPointerEvents: 'none' as const,
        } : {})}
      />
    )
  }

  const brand = (showTitle: boolean) => (
    <Link href="/" className="flex items-center gap-2.5" aria-label={t('title')}>
      <span aria-hidden className="shrink-0 whitespace-nowrap text-2xl leading-none">💃🕺</span>
      {showTitle && <span className="text-[17px] font-bold leading-tight tracking-wide">{t('title')}</span>}
    </Link>
  )

  return (
    <>
      <Drawer
        offset={8}
        radius="md"
        size="xs"
        position="right"
        opened={opened}
        onClose={close}
        title={
          <Link href="/" onClick={close} className="flex items-center gap-2.5">
            <span aria-hidden className="shrink-0 whitespace-nowrap text-[26px] leading-none">💃🕺</span>
            <span className="text-[17px] font-bold leading-tight tracking-wide">{t('title')}</span>
          </Link>
        }
        // data-autofocus: 打開選單時把焦點放在關閉鈕，而不是第一個連結
        closeButtonProps={{ size: 44, 'aria-label': t('nav.close_menu'), ...({ 'data-autofocus': true } as object) }}
        styles={{
          content: { display: 'flex', flexDirection: 'column' },
          header: { minHeight: 72, padding: '0 10px 0 20px' },
          title: { flex: 1, minWidth: 0 },
          body: { flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', padding: '0 20px 16px' },
        }}
      >
        <div className="mb-3 flex">
          {renderSelectCity('w-44', true)}
        </div>

        {routeGroups.map((group, index) => (
          <div key={index}>
            {index > 0 && <div aria-hidden className="my-2 h-px bg-border-third" />}
            <div className="flex flex-col">
              {group.map(renderDrawerLink)}
            </div>
          </div>
        ))}

        <div className="flex-1" />

        <div aria-hidden className="mb-2 mt-3 h-px bg-border-third" />
        <div className="flex items-center justify-between pb-[env(safe-area-inset-bottom)]">
          <div className="flex items-center gap-[18px]">
            <Link href="/about" onClick={close} className="flex min-h-11 items-center pl-1 text-[15px] font-bold hover:text-red-500 transition">
              {t('nav.about')}
            </Link>
            <a href={DONATE_URL} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center text-[15px] font-bold hover:text-red-500 transition">
              {t('nav.donate')}
            </a>
          </div>
          <div role="group" aria-label={t('nav.language')} className="flex h-11 overflow-hidden rounded-[10px] border border-border-main">
            {(['tw', 'en'] as Locale[]).map(locale => (
              <button
                key={locale}
                type="button"
                aria-pressed={currentLocale === locale}
                onClick={() => changeLocale(locale)}
                className={`w-11 text-sm font-bold transition ${currentLocale === locale ? 'bg-text-main text-background-main' : 'text-text-sub hover:text-red-500'}`}
              >
                {locale.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </Drawer>

      <nav aria-label={t('nav.main_menu')} className="border-b border-b-border-main w-full backdrop-blur-xl">
        <div className="flex h-16 items-stretch justify-between container mx-auto px-6 max-w-6xl">
          <div className="flex items-center">
            <span className="max-md:hidden">{brand(true)}</span>
            <span className="md:hidden">{brand(false)}</span>
          </div>

          <div className="hidden max-md:flex items-center">
            <Burger opened={opened} onClick={open} aria-label={t('nav.open_menu')} />
          </div>

          <div className="flex items-stretch gap-7 max-md:hidden">
            <div className="flex items-stretch">
              {routeGroups.map((group, index) => (
                <div key={index} className="flex items-stretch">
                  {index > 0 && <span aria-hidden className="mx-2.5 h-5 w-px self-center bg-border-main" />}
                  {group.map(r => renderDesktopLink(r, index))}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {renderSelectCity('w-36 hover:border-red-500')}
              <div
                role="button"
                tabIndex={0}
                aria-label={t('nav.language')}
                className="font-bold cursor-pointer border-border-main border flex justify-center items-center h-9 w-12 rounded-sm box-border  hover:text-red-500 hover:border-red-500 transition"
                onClick={() => changeLocale(currentLocale === 'tw' ? 'en' : 'tw')}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    changeLocale(currentLocale === 'tw' ? 'en' : 'tw')
                  }
                }}
              >
                {currentLocale.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
