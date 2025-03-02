import "@/styles/globals.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Layout from "@/components/layout";
import Head from "next/head";
import type { AppProps } from 'next/app'
import "@/styles/globals.css";
import '@mantine/dates/styles.css';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>台北社交舞指南</title>
				<link
					rel="icon"
					href="/favicon.png"
				/>
			</Head>
			<MantineProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</MantineProvider>
		</>
	);
}
