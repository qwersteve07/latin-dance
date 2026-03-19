import { DanceType } from "@/types/danceTypes";
import { ReactElement } from "react";

const DanceTypeCube = ({ type, className ,children}: { type: DanceType, className?: string ,children: ReactElement}) => {

    const danceTypeColor = (type: DanceType) => {
        switch (type) {
            case 'cuban salsa': return 'bg-red-800';
            case 'salsa on 1': return 'bg-red-600';
            case 'salsa on 2': return 'bg-red-400';
            case 'salsa': return 'bg-red-400'
            case 'bachata': return 'bg-yellow-300';
            case 'zouk': return 'bg-blue-400';
            case 'lambada': return 'bg-green-300';
            case 'kizomba': return 'bg-purple-400'
            case 'hustle': return 'bg-cyan-400'
        }
    }
    
    if(children){
        return <div className={`${className} rounded-full ${danceTypeColor(type)}`}>{children}</div>
    }

    return <div className={`${className} rounded-full w-2 h-2 ${danceTypeColor(type)}`}/>
}

export default DanceTypeCube