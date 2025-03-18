import "@/styles/globals.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Layout from "@/components/layout";
import Head from "next/head";
import type { AppProps } from 'next/app'
import "@/styles/globals.css";
import '@mantine/dates/styles.css';
import '@/polyfill/object-groupBy'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>台灣社交舞指南</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="user-scalable=no,width=device-width,initial-scale=1,shrink-to-fit=no,minimum-scale=1,maximum-scale=1,viewport-fit=cover" />
				<meta name="description" content="（還不是）最完善的社交舞資訊平台" />
				<meta name="keywords" content="social-dance latin-social" />
				<link rel="author" href="Steve Lee" />
				<link rel="canonical" href="http://social-dance.tw" />
				<link rel="icon" href="/favicon.png" />
				<meta property="og:url" content="http://social-dance.tw" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="台北社交舞指南" />
				<meta property="og:description" content="（還不是）最完善的社交舞資訊平台" />
				<meta property="og:image" content="/og.png" />
			</Head>
			<MantineProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</MantineProvider>
		</>
	);
}
