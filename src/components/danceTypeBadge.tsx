import { DanceType } from "@/types/danceTypes"

function DanceTypeBadge({ type }: { type: DanceType }) {
    const colors: Record<DanceType, string> = {
        'salsa on 1': 'bg-red-800/20 text-red-500 border-red-500/30',
        'salsa on 2': 'bg-red-800/20 text-red-500 border-red-500/30',
        'salsa': 'bg-red-800/20 text-red-500 border-red-500/30',
        'bachata': 'bg-yellow-800/20 text-yellow-500 border-yellow-500/30',
        'zouk': 'bg-blue-800/20 text-blue-500 border-blue-500/30',
        'lambada': 'bg-green-800/20 text-green-500 border-green-500/30',
        'kizomba': 'bg-purple-800/20 text-purple-500 border-purple-500/30'
    }

    const labels: Record<DanceType, string> = {
        'salsa on 1': "Salsa on 1",
        'salsa on 2': "Salsa on 2",
        'salsa': "Salsa",
        'bachata': "Bachata",
        "kizomba": "Kizomba",
        "lambada": 'Lambada',
        "zouk": "Zouk"

    }

    return <span className={`px-2 py-1 text-xs font-medium rounded-full border ${colors[type]}`}>{labels[type]}</span>
}

export default DanceTypeBadge