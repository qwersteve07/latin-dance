import Title from "@/components/title";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";

export default function FoodMap() {
    const { t } = useTranslation('common')
    return (
        <>
            <NextSeo
                title={`${t('title')} | ${t('food_map.title')}`}
                description={t('food_map.description')}
                openGraph={{
                    type: 'website',
                    url: 'http://social-dance.tw/food-map',
                    siteName: `${t('title')} | ${t('food_map.title')}`,
                    description: t('food_map.description'),
                }}
            />
            <Title>{t('food_map.page_title')}</Title>
            <p>{t('food_map.content')}</p>
            <div className="w-full h-[600px] mt-4">
                <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1o4Z6W9OdDjXTamrkv85Sj8CGqYPFJqk&ehbc=2E312F&noprof=1" width="100%" height="100%" />
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