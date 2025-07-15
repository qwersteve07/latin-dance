import Footer from './footer';
import Navigator from './navigator';
import InstallPromptBanner from './InstallPromptBanner';
import GetFuegoBanner from './getFuegoBanner';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-start items-center flex-col min-h-screen bg-background-main text-text-main">
      <div className="w-full">
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
