import Image from "next/image";

export default function OrganizerImage({ src, alt }: { src: string, alt: string }) {
  return (
    <div className="w-20 h-20 relative rounded-full border-2 border-gray-300">
      <Image
        className="rounded-full object-contain"
        src={src}
        alt={alt}
        fill
        priority
      />
    </div>
  );
}
