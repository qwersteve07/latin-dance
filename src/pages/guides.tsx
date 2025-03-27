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
  ];

  const recommendList = [
    {
      title: "舞會禮儀知多少？",
      link: "https://www.instagram.com/p/DF8SdNGTvBq/?igsh=MTZkZzJkNmg0N3QyYg%3D%3D",
    },
    {
      title: "在社交舞活動中遇到可能的騷擾行為怎麼辦？",
      link: "https://latiifahtsai.medium.com/%E5%9C%A8%E7%A4%BE%E4%BA%A4%E8%88%9E%E6%B4%BB%E5%8B%95%E4%B8%AD%E9%81%87%E5%88%B0%E5%8F%AF%E8%83%BD%E7%9A%84%E9%A8%B7%E6%93%BE%E8%A1%8C%E7%82%BA%E6%80%8E%E9%BA%BC%E8%BE%A6-108ed2798c47",
    },
    {
      title: "社交舞蹈近距離動作適當身體界線的11條基本原則（ig 圖文版）",
      link: 'https://www.instagram.com/p/DGC66CKT6oK/?igsh=MTQzZHV0bG83b20wMQ=='
    },
    {
      title: "社交舞蹈近距離動作適當身體界線的11條基本原則（文字版）",
      link: "https://latiifahtsai.medium.com/%E7%A4%BE%E4%BA%A4%E8%88%9E%E8%B9%88%E8%BF%91%E8%B7%9D%E9%9B%A2%E5%8B%95%E4%BD%9C%E9%81%A9%E7%95%B6%E8%BA%AB%E9%AB%94%E7%95%8C%E7%B7%9A%E7%9A%8411%E6%A2%9D%E5%9F%BA%E6%9C%AC%E5%8E%9F%E5%89%87-11-basic-principles-for-maintaining-appropriate-physical-boundaries-in-39776d05d645",
    },
    {
      title: "不要教不是你的學生的人",
      link: "https://flowtaipei.com/%e7%a4%be%e4%ba%a4%e8%88%9e%e8%b9%88%e9%a0%98%e8%a2%96%e6%8f%90%e7%a4%ba1-%e4%b8%8d%e8%a6%81%e6%95%99%e4%b8%8d%e6%98%af%e4%bd%a0%e7%9a%84%e5%ad%b8%e7%94%9f%e7%9a%84%e4%ba%ba/",
    },
  ];


  return (
    <>
      <NextSeo
        title={t('guides.title')}
        description={t('guides.description')}
        openGraph={{
          type: 'website',
          url: 'http://social-dance.tw/guides',
          siteName: 'Taiwan Social Dance Guide | Social Guides for Dancers 新手須知 & 舞會指引',
          description: '參與社交舞圈必須了解的文化和相關禮儀',
        }}
      />
      <div className="flex justify-between items-center flex-col justify-items-center min-h-screen container mx-auto">
        <div>
          <Title>{t('guides.title')}</Title>
          <p className="-mt-4 mb-10 font-bold">Written by Eric Chen</p>
          <p className="mb-4 ">
            {t('guides.description')}
          </p>
          <ul className="list-disc pl-4 mb-4">
            {groundRules.map(r => (
              <li key={r.title} className="mb-7">
                <div className="text-lg font-bold">{r.title}</div>
                <div>{r.content}</div>
              </li>
            ))}
          </ul>
          <p className="mb-12">
            {t('guides.warning')}
          </p>
          <h2 className="text-2xl font-bold mb-4">{t('guides.read')}</h2>
          <ul className="list-disc pl-4 mb-12 max-md:mb-8">
            {recommendList.map(item => {
              return (
                <li className="py-1" key={item.title}>
                  <OuterLink href={item.link}>{item.title}</OuterLink>
                </li>
              );
            })}
          </ul>
          <Button variant="outline" onClick={() => router.push("/organizers")}>
            {t('check_organizers')}
          </Button>
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