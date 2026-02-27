import { Image as ImageKit } from '@imagekit/next';
import Image from "next/image"

const ThumbNail = ({ url, name, className }: { url: string, name: string, className: string }) => {
    if (!url) {
        return (
            <div className="flex h-full w-full items-center justify-center text-base font-semibold">
                {name.charAt(0).toUpperCase() || "?"}
            </div>
        )
    }

    if (url.includes('imagekit')) {
        return (
            <ImageKit
                urlEndpoint="https://ik.imagekit.io/8bhpp1r3a"
                src={url}
                alt={name}
                fill
                className={`object-cover ${className}`}
            />
        )
    } else {
        return (
            <Image
                src={url}
                alt={name}
                fill
                className={`object-cover ${className}`}
            />
        )
    }
}


export default ThumbNail