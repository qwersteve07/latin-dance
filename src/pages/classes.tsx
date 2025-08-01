import Title from "@/components/title";
import { danceTypes } from "@/const/dance-types";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";
import { useMedia } from "react-use";
import { useRouter } from "next/router";
import { organizerList, classesList, useAppState } from "@/store/appState";
import { Select } from "@mantine/core";
import { useAppStore } from "@/store/appStore";
import DanceTypeCube from "@/components/dance-type-cube";

const weekdays = ['Mon', 'Tue', "Wed", "Thu", 'Fri', 'Sat', 'Sun']

danceTypes.splice(0, 2, 'salsa')

export default function Classes() {
    const { t } = useTranslation('common')
    const [selectType, setSelectType] = useState<string>('');
    const [currentClassesData, setCurrentClassesData] = useState<any>([]);
    const isMobile = useMedia("(max-width: 768px)");
    const appState = useAppState()
    const appStore = useAppStore()

    useEffect(() => {
        if (!appStore.currentCity) return

        let result = getFilteredClassesData(appStore.currentCity, selectType)
        setCurrentClassesData(result)
    }, [appStore.currentCity, selectType])

    function getFilteredClassesData(city: string, selectType: string) {
        let result;
        const filterByCityClasses = classesList.filter((data) => {
            return data.city === city
        })

        if (selectType === '') {
            result = filterByCityClasses
        } else {
            result = filterByCityClasses.map((data) => {
                const filteredLessons = data.lessons.filter((c) => {
                    if (Array.isArray(c.type)) {
                        return c.type.includes(selectType)
                    } else {
                        return c.type === selectType
                    }
                });
                return {
                    ...data,
                    lessons: filteredLessons
                }
            }).filter((d: any) => d.lessons.length > 0)
        }

        return result;
    }

    if (!appState.domLoaded) {
        return <></>;
    }

    return (
        <>
            <NextSeo
                title={`${t('title')} | ${t('classes.title')}`}
                description={t('classes.description')}
                openGraph={{
                    type: 'website',
                    url: 'http://social-dance.tw/classes',
                    siteName: `${t('title')} | ${t('classes.title')}`,
                    description: t('classes.description'),
                }}
            />
            <Title>{t('classes.page_title')}</Title>
            <p>{t('classes.note')}</p>
            <div className="flex flex-wrap gap-x-2 gap-y-2 mb-6 text-sm mt-10">
                {danceTypes.map(t => {
                    return (
                        <div
                            key={t}
                            className={`cursor-pointer border-dashed border-border-main border-2 rounded-2xl px-3 py-1 flex justify-start items-center gap-1 md:hover:bg-background-sub ${selectType === t ? 'bg-background-sub border-border-sub' : 'bg-transparent'}`}
                            onClick={() => {
                                if (selectType !== t) {
                                    setSelectType(t)
                                } else {
                                    setSelectType('')
                                }
                            }}
                        >
                            <DanceTypeCube type={t} />{t}
                        </div>)
                })}
            </div>
            {isMobile && <MobileUI data={currentClassesData} />}
            {!isMobile && <DesktopUI data={currentClassesData} />}
        </>
    )
}

function MobileUI({ data }: { data: any }) {
    const [currentWeekDay, setCurrentWeekDay] = useState<string>(weekdays[0])
    const [currentData, setCurrentData] = useState<any>([])
    const router = useRouter()
    const { t } = useTranslation('common')

    useEffect(() => {
        const filteredData = data.map((d: any) => ({
            ...d,
            lessons: d.lessons.filter((c: any) => c.weekday === currentWeekDay)
        })).filter((d: any) => d.lessons.length > 0)

        setCurrentData(filteredData);
    }, [data, currentWeekDay])

    return (
        <div>
            <div className={`grid grid-cols-2 gap-2 z-[101] py-4 mb-3 border-b border-border-main bg-background-main`}>
                <div></div>
                <Select
                    className="w-full"
                    defaultValue={weekdays[0]}
                    value={currentWeekDay}
                    onChange={value => setCurrentWeekDay(value || '')}
                    data={weekdays.map(item => ({
                        value: item,
                        label: item
                    }))}
                    allowDeselect={false}
                />
            </div>
            <div className="grid grid-cols-2 gap-2">
                {currentData.length === 0 && <div className="col-span-2">{t('classes.no_classes_day')}</div>}
                {currentData.map((classData: any) => {
                    if (classData.lessons.length === 0) return <></>

                    const Organizer = () => {
                        if (!classData.organizer) return <></>
                        const name = organizerList.find(o => o.id === classData.organizer)?.name
                        return <div className="font-bold italic text-gray-500">{name}</div>
                    }
                    return (
                        <>
                            <div onClick={() => {
                                if (classData.organizer) return router.push(`/organizers?id=${classData.organizer}`)
                                router.push(`/organizers?id=${classData.id}`)
                            }} className="group cursor-pointer">
                                <div className="font-bold text-lg group-hover:text-red-500 transition-[color]">{classData.name}</div>
                                <Organizer />
                            </div>
                            <div>{classData.lessons.map((c: any) => {
                                const DanceType = () => {
                                    if (Array.isArray(c.type)) {
                                        return c.type.map((t: string) => <DanceTypeCube type={t} />)
                                    } else {
                                        return <DanceTypeCube type={c.type} />
                                    }
                                }
                                return (
                                    <div key={c.name} className="flex justify-start items-start gap-2 border border-border-main rounded-2xl p-2 mb-1 hover:bg-background-third transition">
                                        <div className="mt-1.5 flex flex-col gap-1"><DanceType /></div>
                                        <div>
                                            <div className="font-semibold">{c.name}</div>
                                            <div >{c.time}</div>
                                        </div>
                                    </div>
                                )
                            })}</div>
                            <hr className="col-span-2 border-0 border-b border-border-main" />
                        </>
                    )
                })}
            </div>
        </div>
    )
}

function DesktopUI({ data }: { data: any }) {
    const { t } = useTranslation('common')
    const router = useRouter()
    // const appStore = useAppStore()
    // const [offset, setOffset] = useState(0)
    // const appState = useAppState()

    // useEffect(() => {
    //     if (!appState.domLoaded) return
    //     if (!appState.installPromptBannerRef.current) return
    //     console.log('classes')
    //     console.log(appState.installPromptBannerRef.current)
    // }, [appState.domLoaded, appState.installPromptBannerRef, appState.installPromptBannerRef.current])

    // // useEffect(() => {
    // //     if (!appState.domLoaded) return
    // //     console.log(appState.domLoaded)
    // //     const installPromptBannerShow = !appStore.installBannerHide
    // //     const fuegoBannerShow = !appStore.getFuegoBannerHide
    // //     const amount = 0
    // //     if (installPromptBannerShow) {
    // //         console.log(appState.installPromptBannerRef.current)
    // //         console.log(appState.getFuegoBannerRef.current)
    // //     }
    // // }, [appState.domLoaded])

    return (
        <>
            <div className={`grid grid-cols-8 gap-2 z-[101] py-4 mb-3 border-b border-border-main bg-background-main`}>
                <div></div>
                {weekdays.map(day => <div key={day} className="font-bold">{day}</div>)}
            </div>
            <div className="grid grid-cols-8 gap-2">
                {data.length === 0 && <div className="col-span-8">{t('classes.no_classes_city')}</div>}
                {data.map((classData: any) => {
                    const Organizer = () => {
                        if (!classData.organizer) return <></>
                        const name = organizerList.find(o => o.id === classData.organizer)?.name
                        return <div className="font-bold italic text-gray-500">{name}</div>
                    }

                    return (
                        <>
                            <div onClick={() => {
                                if (classData.organizer) return router.push(`/organizers?id=${classData.organizer}`)
                                router.push(`/organizers?id=${classData.id}`)
                            }} className="group cursor-pointer">
                                <div className="font-bold text-lg group-hover:text-red-500 transition-[color]">{classData.name}</div>
                                <Organizer />
                            </div>
                            {weekdays.map((weekday, i) => {
                                const classesInWeekday = classData.lessons.filter((g: any) => g.weekday === weekday)
                                if (classesInWeekday.length === 0) return <div key={i}></div>

                                return (
                                    <div key={i}>{classesInWeekday.map((c: any) => {

                                        const DanceType = () => {
                                            if (Array.isArray(c.type)) {
                                                return c.type.map((t: string) => <DanceTypeCube type={t} />)
                                            } else {
                                                return <DanceTypeCube type={c.type} />
                                            }
                                        }
                                        return (
                                            <div key={c.name} className="flex justify-start items-start gap-2 border border-border-main rounded-2xl p-2 mb-1 hover:bg-background-third transition">
                                                <div className="mt-1.5 flex flex-col gap-1"><DanceType /></div>
                                                <div>
                                                    <div className="font-semibold">{c.name}</div>
                                                    <div >{c.time}</div>
                                                </div>
                                            </div>
                                        )
                                    })}</div>
                                )
                            })}
                            <hr className="col-span-8 border-0 border-b border-border-main" />
                        </>
                    )
                })}
            </div>
        </>
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