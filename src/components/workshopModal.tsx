import { Workshop } from "@/types/workshop";
import dayjs from "dayjs";
import { Calendar, Clock, MapPin, Sparkles, X } from "lucide-react";
import DanceTypeBadge from "./danceTypeBadge";
import { ClassLevelBadge } from "./classLevelBadge";
import { DanceType } from "@/types/danceTypes";
import OuterLink from "./outerLink";
import { getLocate, getLocateLink } from "@/utils/getLocate";
import { Modal } from "@mantine/core";
import React from "react";

const WorkshopModal = ({
  data,
  opened,
  onClose,
}: {
  data: Workshop | null;
  opened: boolean,
  onClose: () => void,
}) => {
  if (!data) return null;

  const danceTypeColor = (type: DanceType) => {
    switch (type) {
      case 'salsa on 1': return 'from-red-800/15';
      case 'salsa on 2': return 'from-red-400/15';
      case 'salsa': return 'from-red-400/15';
      case 'bachata': return 'from-yellow-300/15';
      case 'zouk': return 'from-blue-400/15';
      case 'lambada': return 'from-green-300/15';
      case 'kizomba': return 'from-purple-400/15'
      case 'hustle': return 'from-cyan-400/15';
    }
  }

  const danceTypeColorBg = (type: DanceType) => {
    switch (type) {
      case 'salsa on 1': return 'bg-red-800/80 hover:bg-red-800/90 transition';
      case 'salsa on 2': return 'bg-red-400/80 hover:bg-red-400/90 transition';
      case 'salsa': return 'bg-red-400/80 hover:bg-red-400/90 transition';
      case 'bachata': return 'bg-yellow-300/50 hover:bg-yellow-300/60 transition';
      case 'zouk': return 'bg-blue-400/80 hover:bg-blue-400/90 transition';
      case 'lambada': return 'bg-green-300/80 hover:bg-green-300/90 transition';
      case 'kizomba': return 'bg-purple-400/80 hover:bg-purple-400/90 transition'
      case 'hustle': return 'bg-cyan-400/70 hover:bg-cyan-400/80 transition';
    }
  }


  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      padding='0'
      title={null}
      withCloseButton={false}
    >
      <div
        className={`relative p-4 bg-gradient-to-r ${danceTypeColor(data.type)} to-transparent w-full`}
      >
        <X onClick={onClose} className="cursor-pointer absolute right-4 top-4" />
        <div className="gap-3">
          <div className="flex items-center gap-2 mb-2">
            <DanceTypeBadge type={data.type} />
            <ClassLevelBadge level={data.level} />
          </div>
          <div className="text-xl font-bold text-balance whitespace-nowrap">
            {data.name}
          </div>
        </div>
      </div>
      <div className="space-y-4 p-4 max-h-[50vh] overflow-scroll">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-gray-500">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">
              {dayjs(data.date).format("YYYY-MM-DD")}
            </span>
          </div>
          {data.startAt && <div className="flex items-center gap-3 text-gray-500">
            <Clock className="h-4 w-4" />
            <span className="text-sm">
              {data.startAt} - {data.endAt}
            </span>
          </div>}
          {data.locate && <div className="flex items-center gap-3 text-gray-500">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">
              <OuterLink href={getLocateLink(data.locate || "")}>
                <div className="text-text-main font-bold">
                  {getLocate(data.locate || "")}
                </div>
              </OuterLink>
            </span>
          </div>}
        </div>
        <div className="rounded-lg border border-border-main p-4">
          <p className="mb-1 text-xs font-medium text-gray-500">
            課程說明
          </p>
          <p className="text-sm leading-relaxed ">
            {data.details.split("\n").map((x: string) => (
              <div key={x}>
                {x}
                <br />
              </div>
            ))}
          </p>
        </div>
      </div>
      <div className="flex items-center  justify-between border-t border-border-main py-4 mx-4 ">
        <div>
          <p className="text-xs text-gray-500">費用</p>
          <p className="text-lg font-bold">
            {data.price}
          </p>
        </div>
        {data.url && (
          <a href={data.url} target="_blank" rel="noopener noreferrer" className={`rounded-lg h-10 px-4 ${danceTypeColorBg(data.type)} flex justify-center items-center `}>
            <Sparkles className="mr-1.5 size-4" />
            立即報名
          </a>
        )}
      </div>
    </Modal >
  );
}

export default WorkshopModal