const DanceTypeCube = ({ type, className }: { type: string, className?: string }) => {

    const danceTypeColor = (type: string) => {
        switch (type) {
            case 'salsa on 1': return 'bg-red-800';
            case 'salsa on 2': return 'bg-red-400';
            case 'salsa': return 'bg-red-400'
            case 'bachata': return 'bg-yellow-300';
            case 'zouk': return 'bg-blue-400';
            case 'lambada': return 'bg-green-300';
            case 'kizomba': return 'bg-purple-400'
        }
    }

    return <div className={`${className} rounded-sm min-w-3 h-3 ${danceTypeColor(type)}`} />
}

export default DanceTypeCube