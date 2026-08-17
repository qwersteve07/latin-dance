import { Platform } from "@/types/article"
import { Globe, Link } from "lucide-react"
import IconInstagram from '../../public/icon-instagram.svg'
import IconThreads from '../../public/icon-threads.svg'
import IconMedium from '../../public/icon-medium.svg'

export default function PlatformIcon({ platform, className }: { platform: Platform, className?: string }) {
    switch (platform) {
        case "instagram":
            return <IconInstagram className={`h-4 w-4 ${className}`} />
        case "threads":
            return <IconThreads className={`h-4 w-4 ${className}`} />
        case "medium":
            return <IconMedium className={`h-4 w-4 ${className}`} />
        case "blog":
            return <Globe className={`h-4 w-4 ${className}`} />
        default:
            return <Link className={`h-4 w-4 ${className}`} />
    }
}
