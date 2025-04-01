import Title from "@/components/title";
import { Button } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import React from "react";

export default function About() {
    const { t } = useTranslation('common')
    return (
        <div className="leading-8">
            <NextSeo
                title={`${t('title')} | ${t('about.title')}`}
                description={t('about.description')}
                openGraph={{
                    type: 'website',
                    url: 'http://social-dance.tw/about',
                    siteName: `${t('title')} | ${t('about.title')}`,
                    description: t('about.description'),
                }}
            />
            <Title>{t('about.page_title')}</Title>
            {t('about.content').split('\n').map(text => {
                return <React.Fragment key="text"><p>{text}</p></React.Fragment>
            })}
            <Button className="mt-4" variant="outline" onClick={() => window.open('https://portaly.cc/qwersteve07/support')}>
                {t('about.donate')}
            </Button>
            <h3 className="mt-14 mb-4 font-bold text-xl">Special Thanks</h3>
            <p>
                Amy、Ariel、Arthur、Brianna、Calvin、Charlene、Eric Chen、Fiona、Glenn、
                Jane、Jenny、Josephine、JW、Kiki、Latiifah、Leticia、Mandy、Mics、Natasha、Patty
                RayGo、Rosalie、Sam、Susan、Trison、Yuyu、Vicky Chichi、Vicky老王、
                丁丁、天天、拉拉、閃亮亮
            </p>
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