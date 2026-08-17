import OuterLink from "@/components/outerLink";
import PlatformIcon from "@/components/platformIcon";
import Title from "@/components/title";
import { beginnerCategories } from "@/const/beginner";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";

export default function Beginner() {
    const { t } = useTranslation('common')

    return (
        <>
            <NextSeo
                title={`${t('title')} | ${t('beginner.title')}`}
                description={t('beginner.description')}
                openGraph={{
                    type: 'website',
                    url: 'http://social-dance.tw/beginner',
                    siteName: `${t('title')} | ${t('beginner.title')}`,
                    description: t('beginner.description'),
                }}
            />
            <Title>{t('beginner.page_title')}</Title>
            <p className="-mt-4 mb-12">{t('beginner.description')}</p>
            {beginnerCategories.map(category => (
                <section key={category.id} className="mb-16">
                    <h3 className="text-2xl font-bold mb-5 border-b border-gray-300 pb-4">
                        {t(`beginner.category.${category.id}`)}
                    </h3>
                    {category.articles.length === 0 ? (
                        <p className="text-gray-500">{t('beginner.coming_soon')}</p>
                    ) : (
                        <ul className="flex flex-col gap-3">
                            {category.articles.map((article,index) => (
                                <li key={article.link} className="flex items-start gap-2">
                                    <PlatformIcon platform={article.platform} className="shrink-0 mt-1" />
                                    <div>
                                        <OuterLink href={article.link}>{article.title}</OuterLink>
                                    </div>
                                    {index === 0 && <div>👍👍</div>}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            ))}
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
