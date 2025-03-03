import React from "react";
import Head from "next/head";
import Image from "next/image";

const Author: React.FC = () => {
  return (
    <div className=" min-h-screen py-12 px-6">
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
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9RVL0VZTWW"
        ></script>
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

      <div className="mx-auto text-center max-w-sm mb-8 object-contain w-full">
        <Image
          className="w-3/6 mx-auto mb-8"
          src="/animal_chara_computer_azarashi.png"
          alt="アザラシのキャラクター"
          width={500} // 画像の幅を指定
          height={300} // 画像の高さを指定
          sizes="(max-width: 640px) 100vw, 50vw" 
        />

        <h1 className="text-xl font-extrabold text-gray-800">
          Author Name: Hello, World.
        </h1>

        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
          人間。このブログでは主にプログラミングや趣味のことについて書こうと思います。
        </p>

        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          好きなボカロPは
          <span className="font-semibold text-gray-800">日向電工</span>と
          <span className="font-semibold text-gray-800">wowaka</span>。
          使用プログラミング言語は
          <span className="font-semibold text-blue-600">TypeScript</span>と
          <span className="font-semibold text-blue-600">JavaScript</span>。
        </p>
      </div>
    </div>
  );
};

export default Author;
