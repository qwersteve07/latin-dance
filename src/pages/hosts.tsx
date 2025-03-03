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
import HostImage from "@/components/hostImage";
import { Host } from "@/types/host";
import { hostList } from "@/const/host";
import Title from "@/components/title";

export default function Hosts() {
  const [domLoaded, setDomLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>('');
  const [opened, { open, close }] = useDisclosure(false);
  const [selectHost, setSelectHost] = useState<Host>({} as any);

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
      setActiveTab(hostList[0].id);
    }
  }, []);

  if (!domLoaded) {
    return <></>;
  }

  return (
    <>
      <Title
        enTitle='Hosts List'
        chTitle="主辦單位"
      />
      <Modal
        opened={opened}
        onClose={close}
        centered
      >
        <HostContent item={selectHost} />
      </Modal>
      {isMobile && (
        <MobileStudios onClick={(host: Host) => {
          setSelectHost(host)
          open()
        }} />
      )}
      {!isMobile && (
        <DesktopStudios activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </>
  );
}

function MobileStudios({ onClick }: { onClick: (host: Host) => void }) {
  return (
    <>

      <div className="flex justify-start flex-wrap gap-y-8">
        {hostList.map(item => {
          return (
            <div key={item.id} className="flex flex-col items-center flex-[50%] gap-2" onClick={() => {
              onClick(item)
            }}>
              <HostImage src={item.thumbnail} alt={item.name} />
              <div className="text-sm font-bold">{item.name}</div>
            </div>

          );
        })}
      </div>
    </>
  );
}

function DesktopStudios({ activeTab, setActiveTab }: { activeTab: string | null, setActiveTab: (value: string | null) => void }) {
  return (
    <Tabs
      value={activeTab}
      onChange={setActiveTab}
      orientation="vertical"
      className="flex-1"
    >
      <Tabs.List>
        {hostList.map(item => {
          return (
            <Tabs.Tab value={item.id} key={item.id}>
              {item.name}
            </Tabs.Tab>
          );
        })}
      </Tabs.List>
      {hostList.map(item => {
        return (
          <Tabs.Panel
            value={item.id}
            key={item.id}
            className="p-4 flex flex-col justify-start items-center gap-5"
          >
            <HostContent item={item} />
          </Tabs.Panel>
        );
      })}
    </Tabs>
  );
}

function HostContent({ item }: { item: Host }) {
  return (
    <div className="flex justify-between items-center flex-col h-full w-full">
      <div className="flex justify-between items-center flex-col w-2/3 max-md:w-full">
        <HostImage src={item.thumbnail} alt={item.name} />
        <div className="font-bold text-xl mt-4 mb-8">{item.name}</div>
        <div className="mb-4">
          {item.intro?.split("\n").map(x => (
            <p key={x} className="mb-2">
              {x}
              <br />
            </p>
          ))}
        </div>
        <div className="border-t-2 border-b-2 my-2 py-2">{item.party}</div>
        <div className="text-xl font-bold mt-8 mb-6">主辦方</div>
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
      <div className="flex justify-center gap-4 mb-4">
        {Object.entries(item.link).filter(item => item[1] !== '').map(([key, value]) => {
          return <SocialLink key={value} type={key} link={value} />;
        })}
      </div>
    </div>
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
