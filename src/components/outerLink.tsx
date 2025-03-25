import { ReactNode } from "react"

const OuterLink = ({ href, children }: { href: string, children: ReactNode }) => {
    return <a
        href={href}
        className="font-semibold relative before-content-['] before:w-full before:h-3 before:absolute before:-bottom-1 before:bg-text-hover before:z-[0] before:scale-x-0 before:hover:scale-x-[1] before:origin-left before:transition-all before:duration-300"
        target="_blank"
    >
        <span className="relative">
            {children}
        </span>
    </a>
}

export default OuterLink