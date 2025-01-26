import "@/styles/globals.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Layout from "@/components/layout";
import Navigator from "@/components/navigator";

export default function App({ Component, pageProps }) {
  return (
    <MantineProvider>
      <Layout>
        <Navigator />
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}
