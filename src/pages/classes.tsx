import Title from "@/components/title";
import { danceTypes } from "@/const/dance-types";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { danceTypeColor } from "./calendar";
import React, { useEffect, useState } from "react";
import { classesData } from "@/const/classes";
import { useMedia } from "react-use";

const weekdays = ['Mon', 'Tue', "Wed", "Thu", 'Fri', 'Sat', 'Sun']

danceTypes.splice(0, 2, 'salsa')

export default function Classes() {
    const { t } = useTranslation('common')
    const [selectType, setSelectType] = useState<string>('');
    const [currentClassesData, setCurrentClassesData] = useState<any>([]);
    const isMobile = useMedia("(max-width: 768px)");

    useEffect(() => {

        let result;
        if (selectType === '') {
            result = classesData
        } else {
            result = getFilteredClassesData(selectType)
        }

        setCurrentClassesData(result)
    }, [selectType])

    function getFilteredClassesData(selectType: string) {
        return classesData.map(classesData => {
            const team: any = Object.keys(classesData)
            const classesGroup = Object.values(classesData)[0];
            console.log(classesGroup)
            const filteredClassesGroup = classesGroup.filter((c: any) => {
                return c.type == selectType
            });
            return {
                [team]: filteredClassesGroup
            }
        })
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
                            <div className={`rounded-sm w-3 h-3 ${danceTypeColor(t)}`} />{t}
                        </div>)
                })}
            </div>
            {isMobile && <MobileUI />}
            {!isMobile && <DesktopUI data={currentClassesData} />}
        </>
    )
}

function MobileUI() {
    return <div>WIP, Please use Desktop Thanks :)</div>
}

function DesktopUI({ data }: { data: any }) {
    return (
        <>
            <div className="grid grid-cols-8 gap-2 sticky top-0 py-4 mb-4 border-b border-border-main bg-background-main">
                <div></div>
                {weekdays.map(day => <div key={day} className="font-bold">{day}</div>)}
            </div>
            <div className="grid grid-cols-8 gap-2">
                {data.map((classData: any, i: any) => {
                    const team = Object.keys(classData) || ''
                    const classesGroup: any = Object.values(classData)[0]
                    if (classesGroup.length === 0) return <></>
                    return (
                        <>
                            <div className="font-bold">{team}</div>
                            {weekdays.map((weekday, i) => {
                                const classesInWeekday = classesGroup.filter((g: any) => g.weekday === weekday)
                                if (classesInWeekday.length === 0) return <div key={i}></div>

                                return (
                                    <div key={i}>{classesInWeekday.map((c: any) => {
                                        return (
                                            <div key={c.name} className="flex justify-start items-start gap-2 border border-border-main rounded-2xl p-2 mb-1 hover:bg-background-third transition">
                                                <div className={`mt-1.5 rounded-sm min-w-3 h-3 ${danceTypeColor(c.type)}`} />
                                                <div>
                                                    <div className="font-semibold">{c.name}</div>
                                                    <div >{c.time}</div>
                                                </div>
                                            </div>
                                        )
                                    })}</div>
                                )


                            })}
                            {i !== data.length - 1 && <hr className="col-span-8 border-0 border-b border-border-main" />}
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