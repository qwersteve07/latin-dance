import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center gap-2 py-3 w-full bg-gray-100 text-gray-700 text-sm">
      © 2025 by Steve Lee .
      <span className="flex justify-center items-center gap-2">
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
    </footer>
  );
}
