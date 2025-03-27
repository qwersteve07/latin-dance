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

function App({ Component, pageProps }: AppProps) {
	return (
		<>

			<Script id="google-analytics" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', 'G-S3GNBK5XWJ');
		        `}
			</Script>
			<DefaultSeo
				defaultTitle='Taiwan Social Dance Guide | 台灣社交舞指南'
				titleTemplate='Taiwan Social Dance Guide | %s'
				description="致力於提供最完善的拉丁社交舞資訊平台"
				canonical="http://social-dance.tw"
				additionalMetaTags={
					[
						{
							'name': 'viewport',
							'content': 'user-scalable=no,width=device-width,initial-scale=1,shrink-to-fit=no,minimum-scale=1,maximum-scale=1,viewport-fit=cover'
						}
					]
				}
				additionalLinkTags={[
					{
						rel: 'icon',
						href: '/favicon.png',
					},
				]}
				openGraph={{
					type: 'website',
					url: 'http://social-dance.tw',
					siteName: 'Taiwan Social Dance Guide | 台灣社交舞指南',
					description: '致力於提供最完善的社交舞資訊平台',
					images: [
						{
							url: '/og.png', width: 800, height: 600, type: 'images/png'
						}
					]
				}}
			/>
			<MantineProvider theme={{ primaryColor: 'red' }}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</MantineProvider>
		</>
	);
}

export default appWithTranslation(App)