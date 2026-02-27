import ThumbNail from "./thumbnail";

export default function OrganizerImage({ src, alt }: { src: string, alt: string }) {
  return (
    <div className="w-20 h-20 relative rounded-full border-2 border-border-main bg-white">
      <ThumbNail
        url={src}
        name={alt}
        className="rounded-full"
      />
    </div>
  );
}
