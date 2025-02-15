import Image from "next/image";

export default function MemberImage({ src, alt }: { src: string, alt: string }) {
  return (
    <div className="overflow-hidden rounded-lg relative w-[100px] h-[100px]">
      <Image className="object-contain" src={src} alt={alt} fill priority />
    </div>
  );
}
