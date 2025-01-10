import Layout from "@/components/Layout";
import "../styles/global.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}

const GA_TRACKING_ID = "G-9RVL0VZTWW"; // あなたのGoogle Analytics測定ID

const MyApp = ({ Component, pageProps }: any) => {
  const router = useRouter();

  useEffect(() => {
    // ページ遷移が完了するたびにイベントを送信
    const handleRouteChange = (url: string) => {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Google Analyticsのスクリプトを追加 */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}');
        `}
      </Script>
      <Component {...pageProps} />
    </>
  );
};