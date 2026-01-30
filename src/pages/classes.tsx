import Title from "@/components/title";
import { danceLevel, simpleDanceTypes } from "@/const/dance-types";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";
import { useMedia } from "react-use";
import { useRouter } from "next/router";
import { organizerList, useAppState } from "@/store/appState";
import { Select } from "@mantine/core";
import { useAppStore } from "@/store/appStore";
import { DanceType } from "@/types/danceTypes";
import DanceTypeCube from "@/components/danceTypeCube";
import DanceTypeBadge from "@/components/danceTypeBadge";
import { ClassLevelBadge } from "@/components/classLevelBadge";
import { DanceClassLevel, Organizer, Weekday } from "@/types/organizer";

const weekdayDays: Weekday[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

export default function Classes() {
    const { t } = useTranslation('common')
    const [selectType, setSelectType] = useState<string>('');
    const [selectLevel, setSelectLevel] = useState<DanceClassLevel | ''>('');
    const [currentClassesData, setCurrentClassesData] = useState<any>([]);
    const isMobile = useMedia("(max-width: 768px)");
    const appState = useAppState()
    const appStore = useAppStore()

    useEffect(() => {
        if (!appStore.currentCity) return

        const result = getFilteredClassesData(appStore.currentCity, selectType, selectLevel)
        setCurrentClassesData(result)
    }, [appStore.currentCity, selectType, selectLevel])

    function getFilteredClassesData(city: string, selectType: string, selectLevel: string) {
        const validClasses = organizerList.filter(data => {
            return !data.hide && data.classes && data.classes.length !== 0
        }).filter(data => {
            if (city === 'south-taiwan') {
                return data.city === 'tainan' || data.city === 'kaohsiung'
            } else {
                return data.city === city
            }
        })

        return validClasses.map((data: Organizer) => {
            if (!data.classes) return data
            const filteredClasses = data.classes
                .filter((c) => {
                    // filter type
                    if (selectType === '') return c
                    if (Array.isArray(c.type)) {
                        return c.type.includes(selectType)
                    } else {
                        return c.type === selectType
                    }
                }).filter((c) => {
                    // filter level
                    if (selectLevel === '') return data
                    return c.level === selectLevel
                })
            return {
                ...data,
                classes: filteredClasses
            }
        })
            .filter((d: any) => d.classes.length > 0)
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
            <div className="flex justify-start items-center max-md:items-start gap-8 mt-10 mb-4">
                <div className="font-bold">Type</div>
                <div className="flex flex-wrap gap-x-2 gap-y-2 text-sm">
                    {simpleDanceTypes.map(t => {
                        return <DanceTypeBadge key={t} type={t} className={`cursor-pointer !border-dashed ${selectType === t && 'bg-background-third'}`} onClick={() => {
                            if (selectType !== t) {
                                setSelectType(t)
                            } else {
                                setSelectType('')
                            }
                        }} />
                    })}
                </div>
            </div>
            <div className="flex justify-start items-center max-md:items-start gap-8 mb-12">
                <div className="font-bold">Level</div>
                <div className="flex flex-wrap gap-x-2 gap-y-2 text-sm">
                    {danceLevel.map(l => {
                        return <ClassLevelBadge key={l} level={l} className={`!cursor-pointer !border-dashed !border ${selectLevel === l && '!bg-background-third'}`} onClick={() => {
                            if (selectLevel !== l) {
                                setSelectLevel(l)
                            } else {
                                setSelectLevel('')
                            }
                        }} />
                    })}
                </div>
            </div>
            {isMobile && <MobileUI data={currentClassesData} />}
            {!isMobile && <DesktopUI data={currentClassesData} />}
        </>
    )
}

function MobileUI({ data }: { data: any }) {
    const [currentWeekDay, setCurrentWeekDay] = useState<string>(weekdayDays[0])
    const [currentData, setCurrentData] = useState<any>([])
    const router = useRouter()
    const { t } = useTranslation('common')

    useEffect(() => {
        const filteredData = data.map((d: any) => ({
            ...d,
            classes: d.classes.filter((c: any) => c.weekday === currentWeekDay)
        })).filter((d: any) => d.classes.length > 0)

        setCurrentData(filteredData);
    }, [data, currentWeekDay])

    return (
        <div>
            <div className={`grid grid-cols-2 gap-2 z-[101] py-4 mb-3 border-b border-border-third`}>
                <div></div>
                <Select
                    className="w-full"
                    defaultValue={weekdayDays[0]}
                    value={currentWeekDay}
                    onChange={value => setCurrentWeekDay(value || '')}
                    data={weekdayDays.map(item => ({
                        value: item,
                        label: item
                    }))}
                    allowDeselect={false}
                />
            </div>
            <div className="grid grid-cols-2 gap-2">
                {currentData.length === 0 && <div className="col-span-2">{t('classes.no_classes_day')}</div>}
                {currentData.map((classData: any) => {
                    if (classData.classes.length === 0) return <></>

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
                            <div>{classData.classes.map((c: any) => {
                                const DanceType = () => {
                                    if (Array.isArray(c.type)) {
                                        return c.type.map((t: DanceType) => <DanceTypeCube type={t} key={t} />)
                                    } else {
                                        return <DanceTypeCube type={c.type} />
                                    }
                                }
                                return (
                                    <div key={c.name} className="flex justify-start items-start gap-2 border border-border-third rounded-2xl p-2 mb-1 hover:bg-background-third transition">
                                        <div className="mt-1.5 flex flex-col gap-1"><DanceType /></div>
                                        <div>
                                            <div className="font-semibold">{c.name}</div>
                                            <div>{c.time}</div>
                                            <ClassLevelBadge level={c.level} />
                                        </div>
                                    </div>
                                )
                            })}</div>
                            <hr className="col-span-2 border-0 border-b border-border-third" />
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

    return (
        <>
            <div className={`grid grid-cols-8 gap-2 z-[101] py-4 mb-3 border-b border-border-third`}>
                <div></div>
                {weekdayDays.map(day => <div key={day} className="text-gray-500 font-bold text-sm text-center">{day.slice(0, 3).toUpperCase()}</div>)}
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
                            {weekdayDays.map((weekday, i) => {
                                const classesInWeekday = classData.classes.filter((g: any) => g.weekday === weekday)
                                if (classesInWeekday.length === 0) return <div key={i}></div>

                                return (
                                    <div key={i}>{classesInWeekday.map((c: any) => {
                                        const DanceType = () => {
                                            if (Array.isArray(c.type)) {
                                                return c.type.map((t: DanceType) => <DanceTypeCube type={t} key={t} />)
                                            } else {
                                                return <DanceTypeCube type={c.type} key={c.type} />
                                            }
                                        }
                                        return (
                                            <div key={c.name} className="flex justify-start items-start gap-2 border border-border-third rounded-2xl p-2 mb-2 hover:bg-background-fourth transition">
                                                <div className="mt-1.5 flex flex-col gap-1"><DanceType /></div>
                                                <div>
                                                    <div className="font-semibold">{c.name}</div>
                                                    <div >{c.time}</div>
                                                    <ClassLevelBadge level={c.level} />
                                                </div>
                                            </div>
                                        )
                                    })}</div>
                                )
                            })}
                            <hr className="col-span-8 border-0 border-b border-border-third" />
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