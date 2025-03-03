export const danceTypeColor = (type: string) => {
    switch (type) {
        case 'salsa': return 'bg-red-400';
        case 'bachata': return 'bg-yellow-300';
        case 'zouk': return 'bg-blue-400';
        case 'lambada': return 'bg-green-300';
        case 'kizomba': return 'bg-purple-400'
    }
}
