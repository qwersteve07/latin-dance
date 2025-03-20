import { ReactNode } from "react"

const OuterLink = ({ href, children }: { href: string, children: ReactNode }) => {
    return <a
        href={href}
        className="font-semibold relative before-content-['] before:w-full before:h-3 before:absolute before:-bottom-1 before:bg-red-300 before:z-[-1] before:scale-x-0 before:hover:scale-x-[1] before:origin-left before:transition-all before:duration-300"
        target="_blank"
    >
        {children}
    </a>
}

export default OuterLink