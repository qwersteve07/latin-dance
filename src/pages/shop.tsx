import Title from "@/components/title";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from 'next-seo';
import Image from "next/image";

export default function Shop() {
    const { t } = useTranslation('common')

    return (
        <>
            <NextSeo
                title={`${t('title')} | ${t('shop.title')}`}
                description={t('shop.description')}
                openGraph={{
                    type: 'website',
                    url: 'http://social-dance.tw/shop',
                    siteName: `${t('title')} | ${t('shop.title')}`,
                    description: t('shop.description'),
                }}
            />
            <Title>{t('shop.page_title')}</Title>
            <p>敬請期待😚</p>
            <div className="flex justify-start items-center gap-4 max-md:flex-col">
                <div className="w-[400px] relative h-[440px] overflow-hidden rounded-xl mt-4 max-md:w-[300px] max-md:h-[330px]">
                    <Image
                        src="/cloth-1.jpg"
                        alt="cross"
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="w-[370px] relative h-[440px] overflow-hidden rounded-xl mt-4 max-md:w-[300px] max-md:h-[330px]">
                    <Image
                        src="/cloth-2.png"
                        alt="cross"
                        fill
                        className="object-contain"
                    />
                </div>
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