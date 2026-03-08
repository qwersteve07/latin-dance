import Footer from './footer';
import Navigator from './navigator';
import InstallPromptBanner from './InstallPromptBanner';
import GetFuegoBanner from './getFuegoBanner';
import { useEffect } from 'react';
import { useAppState } from '@/store/appState';
import { WorkshopBanner } from './workshopBanner';

export default function Layout({ children }: { children: React.ReactNode }) {
  const appState = useAppState()

  useEffect(() => {
    appState.setDomLoaded()
  }, [])

  return (
    <div className="flex justify-start items-center flex-col min-h-screen bg-background-main text-text-main">
      <div className="w-full sticky top-0 z-10">
        <WorkshopBanner />
        <InstallPromptBanner />
        <GetFuegoBanner />
        <Navigator />
      </div>
      <main className="w-full h-full flex-1 px-6 pb-16 pt-10 container mx-auto max-w-6xl">
        {children}
      </main>
      <Footer />
    </div>
  );
}
