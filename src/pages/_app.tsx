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
import { cityPages, isCityId } from "@/const/cities";


function App({ Component, pageProps }: AppProps) {
	const appState = useAppState()
	const router = useRouter()

	const { data } = useSWR('/social-dance/organizers', fetcher, {
		revalidateOnFocus: false,
	})

	useEffect(() => {
		if (data) {
			appState.setOrganizers(data.result)
			appState.setOrganizerLoaded()
		}
	}, [data])

	// 城市與網址同步：網址的 ?city= 優先（別人分享的連結），否則用使用者上次選的城市，
	// 並把目前城市寫回依城市顯示內容的頁面網址，方便直接複製分享
	useEffect(() => {
		if (!router.isReady) return

		const { city, ...restQuery } = router.query
		const validCity = isCityId(city) ? city : null
		// 用 getState() 讀即時值：hydration 期間 render 拿到的是初始值 taipei，不是 localStorage 裡存的城市
		const { currentCity: savedCity, setCurrentCity } = useAppStore.getState()

		if (validCity && validCity !== savedCity) {
			setCurrentCity(validCity)
		}

		const wantedCity = cityPages.includes(router.pathname)
			? validCity ?? (isCityId(savedCity) ? savedCity : 'taipei')
			: undefined

		if (city !== wantedCity) {
			router.replace(
				{ pathname: router.pathname, query: wantedCity ? { ...restQuery, city: wantedCity } : restQuery },
				undefined,
				{ shallow: true, scroll: false }
			)
		}
	}, [router.isReady, router.pathname, router.query.city])

	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=G-3WRCFDGBML`}
			/>
			<Script id="google-analytics">
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