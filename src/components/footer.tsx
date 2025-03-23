import packageJson from '../../package.json'
import Link from "next/link";
import ContactIcons from './contact';

export default function Footer() {
  return (
    <footer className="flex justify-center items-center gap-2 pt-3 pb-[calc(env(safe-area-inset-bottom)+12px)] w-full bg-gray-100 text-gray-700 text-sm">
      <span>V{packageJson.version}</span>
      <span>© 2025 by Steve Lee.</span>
      <ContactIcons />
      <Link href='/about' className='font-bold underline'>About</Link>
    </footer>
  );
}
