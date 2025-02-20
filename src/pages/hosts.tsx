import { Tabs } from "@mantine/core";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMedia } from "react-use";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MemberImage from "@/components/memberImage";
import HostImage from "@/components/hostImage";
import { Host } from "@/types/host";
import { hostList } from "@/const/host";

export default function Hosts() {
  const [domLoaded, setDomLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>('');
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
      {isMobile && (
        <MobileStudios />
      )}
      {!isMobile && (
        <DesktopStudios activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </>
  );
}

function MobileStudios() {
  return (
    <div className="max-md:-mx-6 ">
      <Swiper
        className="h-full"
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        navigation
        pagination
        onSlideChange={() => console.log("slide change")}
        onSwiper={swiper => console.log(swiper)}
      >
        {hostList.map(item => {
          return (
            <SwiperSlide key={item.id}>
              <div className="rounded-lg px-4 py-8 flex justify-start items-center flex-col mx-6 ">
                <HostContent item={item} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
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
    <div className="flex justify-between items-center flex-col h-full">
      <div className="flex justify-between items-center flex-col">
        <HostImage src={item.thumbnail} alt={item.name} />
        <div className="font-bold text-xl mt-4 mb-8">{item.name}</div>
        <div className="mb-8 mx-10 max-md:mx-0">
          {item.intro?.split("\n").map(x => (
            <p key={x} className="mb-2">
              {x}
              <br />
            </p>
          ))}
        </div>
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
      <div className="flex justify-center gap-4">
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
