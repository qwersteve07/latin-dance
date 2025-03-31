import { Tabs, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useMedia } from "react-use";
import MemberImage from "@/components/memberImage";
import { Organizer } from "@/types/organizer";
import Title from "@/components/title";
import OrganizerImage from "@/components/organizerImage";
import { organizerList, useAppStore } from "@/store/appStore";
import IconFacebook from '../../public/icon-facebook.svg'
import IconInstagram from '../../public/icon-instagram.svg'
import IconWebsite from '../../public/icon-website.svg'
import IconLocate from '../../public/icon-location.svg'
import { NextSeo } from "next-seo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { southTaiwanCities } from "@/const/cities";

export default function Organizers() {
  const [domLoaded, setDomLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>('');
  const [opened, { open, close }] = useDisclosure(false);
  const [selectOrganizer, setSelectOrganizer] = useState<Organizer>({} as any);
  const [activeOrganizerList, setActiveOrganizerList] = useState(organizerList.filter(t => !t.hide))
  const appStore = useAppStore()
  const { t } = useTranslation('common')

  const isMobile = useMedia("(max-width: 768px)");

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    if (!appStore.currentCity) return
    const filteredOrganizersList = organizerList.filter(t => !t.hide).filter(o => {
      if (appStore.currentCity === 'south-taiwan') {
        return southTaiwanCities.includes(o.city)
      } else {
        return o.city === appStore.currentCity
      }
    })
    if (!Array.isArray(filteredOrganizersList)) return
    setActiveOrganizerList(filteredOrganizersList)
    setActiveTab(filteredOrganizersList[0].id);
  }, [appStore.currentCity])

  if (!domLoaded) {
    return <></>;
  }

  return (
    <>
      <NextSeo
        title={t('organizers.title')}
        description={t('organizers.description')}
        openGraph={{
          type: 'website',
          url: 'http://social-dance.tw/organizers',
          siteName: `Taiwan Social Dance Guide | ${t('organizers.title')}`,
          description: t('organizers.description'),
        }}
      />
      <Title>{t('organizers.page_title')}</Title>
      <Modal
        opened={opened}
        onClose={close}
        centered
      >
        <OrganizerContent item={selectOrganizer} />
      </Modal>
      {isMobile && (
        <MobileStudios
          organizerList={activeOrganizerList}
          onClick={(organizer: Organizer) => {
            setSelectOrganizer(organizer)
            open()
          }} />
      )}
      {!isMobile && (
        <DesktopStudios organizerList={activeOrganizerList} activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </>
  );
}

function MobileStudios({ organizerList, onClick }: { organizerList: Array<Organizer>, onClick: (organizer: Organizer) => void }) {
  const { t } = useTranslation('common')

  return (
    <>
      <div className="flex justify-start flex-wrap gap-y-8 gap-x-2">
        {organizerList.map(item => {
          if (item.id === '') return <h3 key={item.id} className="text-xl font-bold mt-10 flex-[100%] pointer-events-none">{t('organizers.individual')}</h3>

          return (
            <div key={item.id} className="flex flex-col items-center flex-[30%] gap-2" onClick={() => {
              onClick(item)
            }}>
              <OrganizerImage src={item.thumbnail} alt={item.name} />
              <div className="text-sm font-bold text-center">{item.name}</div>
            </div>

          );
        })}
      </div>
    </>
  );
}

function DesktopStudios({ organizerList, activeTab, setActiveTab }: { organizerList: Array<Organizer>, activeTab: string | null, setActiveTab: (value: string | null) => void }) {
  const { t } = useTranslation('common')

  return (
    <Tabs
      value={activeTab}
      onChange={setActiveTab}
      orientation="vertical"
    >
      <Tabs.List >
        {organizerList.map(item => {
          if (item.id === '') return <Tabs.Tab value="block" key='block' className="pointer-events-none !text-xl font-bold mt-4">{t('organizers.individual')}</Tabs.Tab>

          return (
            <Tabs.Tab value={item.id} key={item.id} className="w-[200px] hover:bg-background-sub">
              {item.name}
            </Tabs.Tab>
          );
        })}
      </Tabs.List >
      {
        organizerList.map(item => {
          if (item.id === '') return <Tabs.Panel value="block" key="block">block</Tabs.Panel>

          return (
            <Tabs.Panel
              value={item.id}
              key={item.id}
              className="p-4 flex flex-col justify-start items-center gap-5"
            >
              <OrganizerContent item={item} />
            </Tabs.Panel>
          );
        })
      }
    </Tabs >
  );
}

function OrganizerContent({ item }: { item: Organizer }) {
  return (
    <div className="flex justify-between items-center flex-col h-full w-full">
      <div className="flex justify-between items-start flex-col w-2/3 max-md:w-full">
        {item.solo ? <MemberImage src={item.thumbnail} alt={item.name} /> : <OrganizerImage src={item.thumbnail} alt={item.name} />}
        <div className="font-bold text-2xl mt-4 mb-4">{item.name}</div>
        <div className="flex justify-center gap-4 mb-10">
          {Object.entries(item.link).filter(item => item[1] !== '').map(([key, value]) => {
            return <SocialLink key={value} type={key} link={value} />;
          })}
        </div>
        <div className="mb-4">
          {item.intro?.split("\n").map(x => (
            <p key={x} className="mb-2">
              {x}
              <br />
            </p>
          ))}
        </div>
        {item.classes.length !== 0 && <div className="">
          課程包含：<span className="font-bold">{item.classes.join('、')}</span>
        </div>}
        {item.party && <div className="">舞會活動：{item.party}</div>}
        {item.member.length !== 0 && (
          <>
            <div className="text-xl font-bold mt-8 mb-6">團隊成員</div>
            <div className="flex justify-starts items-center gap-x-12 gap-y-4 mb-12 flex-wrap">
              {item.member.map(h => (
                <div
                  key={h.name}
                  className="flex justify-center items-center flex-col gap-2"
                >
                  <MemberImage src={h.image} alt={h.name} />
                  <div className="text-xl ">{h.name}</div>
                </div>
              ))}
            </div></>
        )}
        {item.dance_group && (
          <div className="flex justify-start items-start mt-14 gap-6 max-md:flex-col">
            <div className="relative w-40 min-w-40 rounded-lg overflow-hidden">
              <img src={item.dance_group.thumbnail} alt={item.dance_group.name} className="object-contain" />
            </div>
            <div>
              <div className="font-bold text-2xl mb-4">{item.dance_group.name}</div>
              <div className="mb-4">
                <SocialLink type='instagram' link={item.dance_group.link} />
              </div>
              <div className="mb-4">
                {item.dance_group.intro?.split("\n").map(x => (
                  <p key={x} className="mb-2">
                    {x}
                    <br />
                  </p>
                ))}
              </div>
            </div>
          </div>
        )
        }
      </div >

    </div >
  );
}

function SocialLink({ type, link }: { type: string, link: string }) {

  const Icon = (props: any) => {
    switch (type) {
      case 'facebook': return <IconFacebook {...props} />
      case 'instagram': return <IconInstagram {...props} />
      case 'website': return <IconWebsite {...props} />
      case 'location': return <IconLocate {...props} />
      default: return <></>
    }
  }

  return <Icon className="w-6 hover:stroke-red-500 cursor-pointer" onClick={() => window.open(link)} />
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