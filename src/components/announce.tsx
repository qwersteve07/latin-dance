import { Megaphone } from "lucide-react";

const Announcement = ({ children, single }: { children: React.ReactNode, single?: boolean }) => {
    return (
        <div className={`${single ? 'fixed right-16 bottom-16 max-md:right-4 max-md:bottom-10 z-[10]' : 'relative z-[10]'} group w-12 h-12 bg-red-500 rounded-full flex justify-center items-center`}>
            <Megaphone
                className="w-7 group-hover:-rotate-[20deg] transition-[transform] relative z-[10]"
            />
            <div className='pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-[opacity] 
            absolute bottom-0 right-0
            p-4 pr-12 w-80 max-md:w-[calc(100vw-32px)] bg-red-500 shadow-[0_0_10px_rgba(0,0,0,0.15)] text-white rounded-3xl'>
                {children}
            </div>
        </div>
    )
}

export default Announcement