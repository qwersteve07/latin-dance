import packageJson from '../../package.json'
import Link from "next/link";
import ContactIcons from './contact';

export default function Footer() {
  return (
    <footer className="flex justify-center items-center gap-2 pt-3 pb-[calc(env(safe-area-inset-bottom)+12px)] w-full 
    bg-background-sub text-text-sub text-sm
    ">
      <span>V{packageJson.version}</span>
      <span>© 2025 by Steve Lee.</span>
      <ContactIcons />
      <Link href='/about' className='font-bold underline hover:text-red-500'>About</Link>
    </footer>
  );
}
