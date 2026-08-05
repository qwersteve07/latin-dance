import { useState } from "react";
import {
    ChevronDown,
    ChevronRight,
} from "lucide-react";
import { Workshop } from "@/types/workshop";
import { workshops } from "@/const/workshop";
import DanceTypeBadge from "./danceTypeBadge";
import WorkshopModal from "./workshopModal";
import { useDisclosure } from "@mantine/hooks";
import DanceTypeCube from "./danceTypeCube";
import { DanceType } from "@/types/danceTypes";

export function WorkshopBanner() {
    const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(
        null
    );
    const [expanded, setExpanded] = useState(false);
    const [workshopModalOpened, { open: openWorkshopModal, close: closeWorkshopModal }] = useDisclosure(false);

    const total = workshops.length;

    const workshopCatagsObj = Object.groupBy(workshops, ({ type }: { type: string }) => type)
    const workshopCatagsArr = Object.entries(workshopCatagsObj).map((ws) => {
        return {
            name: ws[0] as DanceType,
            counts: ws[1] ? ws[1].length : 1
        }
    })

    if (total === 0) return <></>;

    return (
        <>
            <WorkshopModal
                data={selectedWorkshop}
                opened={workshopModalOpened}
                onClose={closeWorkshopModal}
            />
            <div
                className="backdrop-blur-xl relative z-10 cursor-pointer py-3
            border-b border-b-border-main hover:bg-background-fourth transition"

            >
                <div className="mx-auto max-w-6xl px-6 w-full container flex justify-between items-center" onClick={() => setExpanded(!expanded)}>
                    <div className="flex">
                        <div className="mx-auto flex max-w-6xl mr-10 max-md:mr-4 items-center">
                            <div className="text-xs font-semibold">
                                👯 Upcoming Workshop
                            </div>
                        </div>

                        {/* Center: rotating workshop ticker */}
                        <div className="flex justify-start items-center text-xs gap-4 max-md:gap-2">
                            {workshopCatagsArr.map(ws => {
                                return (
                                    <div key={ws.name} className="flex items-center gap-1">
                                        <div className="max-md:hidden">{ws.name}</div>
                                        <DanceTypeCube type={ws.name} className="w-5 h-5 text-white font-bold flex justify-center items-center text-md"><>{ws.counts}</></DanceTypeCube>
                                    </div>
                                )
                                return
                            })}
                        </div>
                    </div>

                    {/* Right: controls */}
                    <ChevronDown className={`transition-transform ${expanded ? "rotate-180" : ""}`} />

                    {
                        expanded && (
                            <div className="
                            fixed top-[49px] left-0 w-full max-md:h-[calc(100dvh-49px)]
                             overflow-scroll border-b border-b-border-main duration-200 bg-background-main z-10">
                                <div className="mx-auto grid max-w-6xl container gap-2 px-4 py-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {workshops.map((ws) => (
                                        <DropdownWorkshopCard
                                            key={ws.id}
                                            workshop={ws}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setSelectedWorkshop(ws);
                                                openWorkshopModal();
                                                setExpanded(false);
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div >
        </>
    );
}

function DropdownWorkshopCard({
    workshop,
    onClick,
}: {
    workshop: Workshop;
    onClick: (e: any) => void;
}) {
    return (
        <button
            onClick={onClick}
            className="bg-background-main group flex w-full items-center gap-3 rounded-lg border border-border-main px-4 py-3 text-left transition-all hover:border-border hover:bg-background-third"
        >
            <div className="flex flex-1 flex-col gap-1">
                <span className=" text-sm font-medium text-text-main">
                    {workshop.name}
                </span>
                <span className="flex items-center gap-2 text-xs text-gray-500">
                    <DanceTypeBadge type={workshop.type} />
                    {workshop.date && <div>{workshop.date}</div>}
                    {workshop.startAt && <div>{workshop.startAt} - {workshop.endAt}</div>}
                </span>
            </div>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </button>
    );
}