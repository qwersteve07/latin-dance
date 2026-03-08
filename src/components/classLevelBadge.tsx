import { DanceClassLevel } from "@/types/organizer"

const colors: any = {
    beginner: "text-neutral-400 border-neutral-400/50",
    intermediate: "text-amber-400 border-amber-400/50",
    advanced: "text-orange-400 border-orange-400/50",
    "open-lv": "text-lime-400 border-lime-400/50",
}

const levelLabels: any = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    "open-lv": "Open Levels",
}

export function ClassLevelBadge({ level, className, onClick }: { level: DanceClassLevel, className?: string, onClick?: () => void }) {
    return (
        <span className={
            `px-2 py-1 h-6 text-[10px] font-medium rounded-full border flex items-center overflow-hidden text-ellipsis w-[fit-content] ${colors[level]} ${className}`
        }
            onClick={onClick}>
            {levelLabels[level].toUpperCase()}
        </span>
    )
}