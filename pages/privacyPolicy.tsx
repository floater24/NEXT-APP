import React from "react";
import Head from "next/head";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <Head>
        <title>Hello, World.</title>
        <meta
          name="description"
          content="このページでは、当ブログのプライバシーポリシーについて説明しています。"
        />
        <link rel="icon" href="/565bb1b054c96387a51e6557a796e4e0_xo.ico" />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6071464909624554"
          crossOrigin="anonymous"
        ></script>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9RVL0VZTWW"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9RVL0VZTWW');
            `,
          }}
        />
      </Head>
      <main className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-6">
          プライバシーポリシー
        </h1>

        {/* 広告について */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">広告について</h2>
          <p className="text-gray-600 leading-relaxed">
            当ブログでは、第三者配信の広告サービス（Google
            AdSense）を利用しており、ユーザーの興味に応じた商品やサービスの広告を表示するため、クッキー（Cookie）を使用しております。クッキーを使用することで当サイトはお客様のコンピュータを識別できるようになりますが、お客様個人を特定できるものではありません。
          </p>
        </section>

        {/* アクセス解析ツール */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">アクセス解析ツール</h2>
          <p className="text-gray-600 leading-relaxed">
            当ブログでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。トラフィックデータは匿名で収集されており、個人を特定するものではありません。
          </p>
        </section>

        {/* 著作権 */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">著作権</h2>
          <p className="text-gray-600 leading-relaxed">
            当ブログで掲載している文章や画像などにつきましては、無断転載することを禁止します。当ブログは著作権や肖像権の侵害を目的としたものではありません。著作権や肖像権に関して問題がございましたら、お問い合わせフォームよりご連絡ください。迅速に対応いたします。
          </p>
        </section>

        {/* リンク */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">リンク</h2>
          <p className="text-gray-600 leading-relaxed">
            当ブログは基本的にリンクフリーです。リンクを行う場合の許可や連絡は不要です。ただし、インラインフレームの使用や画像の直リンクはご遠慮ください。
          </p>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
