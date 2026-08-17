import { useRouter } from "next/router";
import OuterLink from "@/components/outerLink";
import Title from "@/components/title";
import { NextSeo } from "next-seo";
import { Button } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Guides() {
  const router = useRouter();
  const { t } = useTranslation('common')

  const groundRules = [
    {
      title: t('guides.item1_title'),
      content: t('guides.item1_content'),
    },
    {
      title: t('guides.item2_title'),
      content: t('guides.item2_content'),
    },
    {
      title: t('guides.item3_title'),
      content: t('guides.item3_content'),
    },
    {
      title: t('guides.item4_title'),
      content: t('guides.item4_content'),
    },
    {
      title: t('guides.item5_title'),
      content: t('guides.item5_content'),
    },
    {
      title: t('guides.item6_title'),
      content: t('guides.item6_content'),
    },
    {
      title: t('guides.item7_title'),
      content: t('guides.item7_content'),
    },
    {
      title: t('guides.item8_title'),
      content: t('guides.item8_content'),
    },
    {
      title: t('guides.item9_title'),
      content: t('guides.item9_content'),
    },
    {
      title: t('guides.item10_title'),
      content: t('guides.item10_content'),
    },

  ];

  return (
    <>
      <NextSeo
        title={`${t('title')} | ${t('guides.title')}`}
        description={t('guides.description')}
        openGraph={{
          type: 'website',
          url: 'http://social-dance.tw/guides',
          siteName: `${t('title')} | ${t('guides.title')}`,
          description: t('guides.description'),
        }}
      />
      <div className="flex justify-between items-center flex-col justify-items-center min-h-screen container mx-auto">
        <div>
          <Title>{t('guides.page_title')}</Title>
          <p className="-mt-4 mb-12 font-bold">Written by Eric Chen / Kiki</p>
          <ul className="list-disc pl-4 mb-12">
            {groundRules.map(r => (
              <li key={r.title} className="mb-7">
                <div className="text-lg font-bold">{r.title}</div>
                <div>{r.content?.split("\n").map(x => (
                  <p key={x} className="">
                    {x}
                    <br />
                  </p>
                ))}</div>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/organizers")}>
            {t('check_organizers')}
          </Button>
          <Button variant="outline" onClick={() => router.push("/beginner")}>
            {t('check_beginner')}
          </Button>
          </div>
        </div>
      </div>
    </>
  );
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