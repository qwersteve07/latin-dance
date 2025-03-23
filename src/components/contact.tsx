import Image from "next/image"

const ContactIcons = () => {
    return (
        <span className="inline-flex justify-start items-center gap-2">
            <Image
                src="/icon-line.svg"
                width="20"
                height="20"
                alt="line"
                className="cursor-pointer"
                priority
                onClick={() => window.open('https://line.me/ti/p/yiXOAql0ru')}
            />
            <Image
                src="/icon-instagram.svg"
                width="20"
                height="20"
                alt="instagram"
                className="cursor-pointer"
                priority
                onClick={() => window.open('https://www.instagram.com/qwersteve07')}
            />
        </span>
    )
}
export default ContactIcons