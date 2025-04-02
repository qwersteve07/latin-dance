import Image from "next/image";

export default function OrganizerImage({ src, alt }: { src: string, alt: string }) {
  return (
    <div className="w-20 h-20 relative rounded-full border-2 border-border-main bg-white">
      <Image
        className="rounded-full object-contain"
        src={src}
        alt={alt}
        fill
      />
    </div>
  );
}
