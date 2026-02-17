import "@/styles/globals.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Layout from "@/components/layout";
import Script from 'next/script';
import type { AppProps } from 'next/app'
import "@/styles/globals.css";
import '@mantine/dates/styles.css';
import '@/polyfill/object-groupBy'
import { DefaultSeo } from "next-seo";
import { appWithTranslation } from 'next-i18next'
import { CookiesProvider } from 'react-cookie';
import { useRouter } from "next/router";
import { useAppStore } from "@/store/appStore";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import { useAppState } from "@/store/appState";
import { useEffect } from "react";

function App({ Component, pageProps }: AppProps) {
	const appState = useAppState()
	const router = useRouter()
	const appStore = useAppStore()

	const { data } = useSWR('/social-dance/organizers', fetcher, {
		revalidateOnFocus: false,
	})

	useEffect(() => {
		if (data) {
			appState.setOrganizers(data.result)
			appState.setOrganizerLoaded()
		}
	}, [data])

	useEffect(() => {
		if (!router.isReady) return

		const city = router.query.city

		if (typeof city === 'string') {
			appStore.setCurrentCity(city)
			router.replace(router.pathname);
		}
	}, [router.isReady, router.query.city])


	return (
		<>
			<Script
				strategy="afterInteractive"
				src={`https://www.googletagmanager.com/gtag/js?id=G-3WRCFDGBML`}
			/>
			<Script id="google-analytics" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', 'G-3WRCFDGBML');
		        `}
			</Script>
			<DefaultSeo
				canonical="http://social-dance.tw"
				additionalMetaTags={
					[
						{
							'name': 'viewport',
							'content': 'user-scalable=no,width=device-width,initial-scale=1,shrink-to-fit=no,minimum-scale=1,maximum-scale=1,viewport-fit=cover'
						},
						{
							name: 'application-name',
							content: 'Taiwan Social Dance Guide'
						}
					]
				}
				additionalLinkTags={[
					{
						rel: 'icon',
						href: '/favicon.png',
					},

					{
						rel: 'apple-touch-icon',
						href: '/icon-150.png',
						sizes: '150x150'
					},
					{
						rel: 'manifest',
						href: '/manifest.json'
					},

				]}
				openGraph={{
					images: [
						{
							url: '/og.png', width: 800, height: 600, type: 'images/png'
						}
					]
				}}
			/>
			<MantineProvider theme={{ primaryColor: 'red' }}>
				<CookiesProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</CookiesProvider>
			</MantineProvider>
		</>
	);
}

export default appWithTranslation(App)