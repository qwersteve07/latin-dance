import Footer from "./footer";

export default function Layout({ children }) {
	return (
		<main className="flex justify-between items-center flex-col justify-items-center min-h-screen px-8 py-8 container mx-auto">
			{children}
			<Footer />
		</main>
	);
}
