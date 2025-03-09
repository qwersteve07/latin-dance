import { Tabs, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMedia } from "react-use";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MemberImage from "@/components/memberImage";
import TeamImage from "@/components/teamImage";
import { Team } from "@/types/team";
import { teamList } from "@/const/teams";
import Title from "@/components/title";

export default function Teams() {
  const [domLoaded, setDomLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>('');
  const [opened, { open, close }] = useDisclosure(false);
  const [selectTeam, setSelectTeam] = useState<Team>({} as any);
  const activeTeamList = teamList.filter(t => !t.hide)

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isMobile = useMedia("(max-width: 768px)");

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    if (id) {
      setActiveTab(id);
    } else {
      setActiveTab(teamList[0].id);
    }
  }, []);

  if (!domLoaded) {
    return <></>;
  }

  return (
    <>
      <Title
        enTitle='Teams List'
        chTitle="團隊列表"
      />
      <Modal
        opened={opened}
        onClose={close}
        centered
      >
        <TeamContent item={selectTeam} />
      </Modal>
      {isMobile && (
        <MobileStudios
          teamList={activeTeamList}
          onClick={(teeam: Team) => {
            setSelectTeam(teeam)
            open()
          }} />
      )}
      {!isMobile && (
        <DesktopStudios teamList={activeTeamList} activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </>
  );
}

function MobileStudios({ teamList, onClick }: { teamList: Array<Team>, onClick: (team: Team) => void }) {
  return (
    <>
      <div className="flex justify-start flex-wrap gap-y-8">
        {teamList.map(item => {
          return (
            <div key={item.id} className="flex flex-col items-center flex-[50%] gap-2" onClick={() => {
              onClick(item)
            }}>
              <TeamImage src={item.thumbnail} alt={item.name} />
              <div className="text-sm font-bold">{item.name}</div>
            </div>

          );
        })}
      </div>
    </>
  );
}

function DesktopStudios({ teamList, activeTab, setActiveTab }: { teamList: Array<Team>, activeTab: string | null, setActiveTab: (value: string | null) => void }) {
  return (
    <Tabs
      value={activeTab}
      onChange={setActiveTab}
      orientation="vertical"
      className="flex-1"
    >
      <Tabs.List>
        {teamList.map(item => {
          return (
            <Tabs.Tab value={item.id} key={item.id}>
              {item.name}
            </Tabs.Tab>
          );
        })}
      </Tabs.List>
      {teamList.map(item => {
        return (
          <Tabs.Panel
            value={item.id}
            key={item.id}
            className="p-4 flex flex-col justify-start items-center gap-5"
          >
            <TeamContent item={item} />
          </Tabs.Panel>
        );
      })}
    </Tabs>
  );
}

function TeamContent({ item }: { item: Team }) {
  return (
    <div className="flex justify-between items-center flex-col h-full w-full">
      <div className="flex justify-between items-start flex-col w-2/3 max-md:w-full">
        <TeamImage src={item.thumbnail} alt={item.name} />
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
        <div className="text-xl font-bold mt-8 mb-6">團隊成員</div>
        <div className="flex justify-center items-center gap-x-12 gap-y-4 mb-12 flex-wrap">
          {item.member.map(h => (
            <div
              key={h.name}
              className="flex justify-center items-center flex-col gap-2"
            >
              <MemberImage src={h.image} alt={h.name} />
              <div className="text-xl ">{h.name}</div>
            </div>
          ))}
        </div>
      </div>

    </div >
  );
}

function SocialLink({ type, link }: { type: string, link: string }) {
  return (
    <Image
      src={`/icon-${type}.svg`}
      width="25"
      height="25"
      alt={type}
      className="cursor-pointer"
      priority
      onClick={() => window.open(link)}
    />
  );
}
