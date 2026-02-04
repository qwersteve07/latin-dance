import { DanceClassLevel } from "@/types/organizer"
import { Badge } from "@mantine/core"

const levelColors: any = {
    beginner: "gray",
    intermediate: "yellow",
    advanced: "orange",
    "open-lv": "lime",
}

const levelLabels: any = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    "open-lv": "Open Levels",
}

export function ClassLevelBadge({ level, className, onClick }: { level: DanceClassLevel, className?: string, onClick?: () => void }) {
    return (
        <Badge
            variant="outline"
            size="sm"
            color={levelColors[level]}
            className={className}
            onClick={onClick}
        >
            {levelLabels[level]}
        </Badge>
    )
}