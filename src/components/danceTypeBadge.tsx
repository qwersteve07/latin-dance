import { DanceType } from "@/types/danceTypes"
import DanceTypeCube from "./danceTypeCube"

function DanceTypeBadge({ type, className, onClick }: { type: DanceType, className?: string, onClick?: () => void }) {
    const colors: Record<DanceType, string> = {
        'cuban salsa': 'text-red-800 border-red-800/30',
        'salsa on 1': 'text-red-600 border-red-600/30',
        'salsa on 2': 'text-red-400 border-red-400/30',
        'salsa': 'text-red-400 border-red-400/30',
        'bachata': 'text-yellow-400 border-yellow-400/30',
        'zouk': 'text-blue-400 border-blue-400/30',
        'lambada': 'text-green-300 border-green-300/30',
        'kizomba': 'text-purple-400 border-purple-400/30',
        'hustle': 'text-cyan-400 border-cyan-400/30'
    }

    const labels: Record<DanceType, string> = {
        'cuban salsa': "Cuban Salsa",
        'salsa on 1': "Salsa on 1",
        'salsa on 2': "Salsa on 2",
        'salsa': "Salsa",
        'bachata': "Bachata",
        "kizomba": "Kizomba",
        "lambada": 'Lambada',
        "zouk": "Zouk",
        'hustle': 'Hustle'
    }

    return (
        <span className={`px-2 py-1 h-6 text-xs font-medium rounded-full border flex items-center gap-2 ${colors[type]} ${className}`} onClick={onClick}>
            <DanceTypeCube type={type} />
            {labels[type]}
        </span>
    )
}

export default DanceTypeBadge