import IconLine from '../../public/icon-line.svg'
import IconInstagram from '../../public/icon-instagram.svg'

const ContactIcons = () => {
    return (
        <span className="inline-flex justify-start items-center gap-2">
            <IconLine
                className="w-5 fill-text-main hover:fill-red-500 cursor-pointer"
                onClick={() => window.open('https://line.me/ti/p/yiXOAql0ru')}
            />
            <IconInstagram
                className="w-5 stroke-text-main  hover:stroke-red-500 cursor-pointer"
                onClick={() => window.open('https://www.instagram.com/qwersteve07')}
            />
        </span>
    )
}
export default ContactIcons