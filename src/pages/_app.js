import "@/styles/globals.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Layout from "@/components/layout";

export default function App({ Component, pageProps }) {
	return (
		<MantineProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</MantineProvider>
	);
}
