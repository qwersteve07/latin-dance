import IconSpeaker from '../../public/speaker.svg'

const Announcement = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='group w-12 h-12 bg-red-500 rounded-full 
        fixed right-16 bottom-16 max-md:right-4 max-md:bottom-10
        flex justify-center items-center
         z-10'>
            <IconSpeaker
                className="w-7 fill-white group-hover:-rotate-[20deg] transition-[transform] z-10"
            />
            <div className='pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-[opacity] 
            absolute bottom-0 right-0
            p-4 pr-12 w-80 max-md:w-[calc(100vw-32px)] bg-red-500 text-white rounded-3xl'>
                {children}
            </div>
        </div>
    )
}

export default Announcement