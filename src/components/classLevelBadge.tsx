import { DanceClassLevel } from "@/types/organizer"
import { Badge } from "@mantine/core"

const levelColors: any = {
    beginner: "gray",
    intermediate: "yellow",
    advanced: "red",
    "open-lv": "cyan",
}

const levelLabels: any = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    "open-lv": "Open Levels",
}

export function ClassLevelBadge({ level }: { level: DanceClassLevel }) {
    return (
        <Badge
            variant="outline"
            size="sm"
            color={levelColors[level]}
        >
            {levelLabels[level]}
        </Badge>
    )
}