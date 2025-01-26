import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <main className="flex justify-start items-center flex-col min-h-screen px-8 py-8 container mx-auto">
      <div className="w-full h-full">{children}</div>
      <Footer />
    </main>
  );
}
