import Footer from './footer';
import Navigator from './navigator';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-start items-center flex-col min-h-screen">
      <Navigator />
      <main className="w-full h-full flex-1 px-6 py-6 pt-24 container mx-auto max-w-6xl">
        {children}
      </main>
      <Footer />
    </div>
  );
}
