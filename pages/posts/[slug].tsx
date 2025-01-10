import React from "react";
import { getAllPosts, getSinglePost } from "../../lib/notionAPI";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";
import Link from "next/link";
import Head from "next/head";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const post = await getSinglePost(params.slug);

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
};

type Post = {
  metadata: {
    Name: string;
    date: string;
    tags: string[];
  };
  markdown: {
    content: string;
    parent: string;
  };
};

const Post = ({ post }: { post: Post }) => {
  return (
    <section className="container px-5 h-auto max-w-3xl mx-auto mt-20  ">
      <Head>
        <title>Hello, World.</title>
        <meta
          name="description"
          content="このページでは、当ブログのプライバシーポリシーについて説明しています。"
        />
        <link rel="icon" href="/favicon.ico" />
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
      <h2 className="w-full text-2xl font-medium">{post.metadata.Name}</h2>
      <div className="border-b-2 w-1/2 mt-1 border-stone-900"></div>
      <span className="text-gray-500">Posted date at {post.metadata.date}</span>
      <br />
      {post.metadata.tags.map((tag, index) => (
        <div
          className="text-white bg-stone-900 rounded-xl font-medium mt-2 px-2 inline-block mr-2 hover:bg-stone-700" //タグの展開タグの展開
          key={index}
        >
          <Link href={`/posts/tag/${tag}/page/1`}>{tag}</Link>
        </div>
      ))}
      <div className="mt-10 font-medium break-words">
        <ReactMarkdown
          className="prose prose-lg text-justify leading-relaxed"
          rehypePlugins={[rehypeRaw]} // 生のHTMLを許可
          components={{
            a: ({ href, ...props }) => {
              //ユーチューブの埋め込みを修正
              if (href && href.includes("youtube.com/watch")) {
                const videoId = href.split("v=")[1]?.split("&")[0];
                return (
                  <div className="iframe-container ">
                    <iframe
                      className="rounded aspect-[3/2]"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                );
              }
              return <a href={href} {...props} />;
            }, //ノーションの文章を整形
            h1: ({ node, ...props }) => (
              <h1 className="text-4xl font-bold my-6" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-3xl font-semibold my-5" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p
                className="text-lg my-4 text-gray-700 leading-loose"
                {...props}
              />
            ),
            ul: ({ node, ...props }) => (
              <ul
                className="list-disc list-inside my-4 font-weight: normal"
                {...props}
              />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-6"
                {...props}
              />
            ),
            img: ({ node, ...props }) => (
              <img
                {...props}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
                className="rounded-lg shadow-md my-4"
              />
            ),
            code({
              inline,
              className,
              children,
              ...props
            }: {
              inline?: boolean;
              className?: string;
              children?: React.ReactNode;
            }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter //コードの背景、コードのカラーの修正修正
                  style={vscDarkPlus}
                  language={match[1]}
                  showLineNumbers={true}
                  lineNumberStyle={{
                    color: "#999",
                    fontSize: "0.8em",
                    paddingRight: "1em",
                  }}
                  PreTag="div"
                  customStyle={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {String(children).trim()} {/* trimで改行や余計な文字を削除 */}
                </SyntaxHighlighter>
              ) : (
                <code {...props}>{String(children).trim()}</code>
              );
            },
          }}
        >
          {post.markdown.parent}
        </ReactMarkdown>
        <Link href="/">
          <span className="pb-20 block mt-3 text-stone-900 hover:text-stone-700">
            &larr; ホームに戻る
          </span>
        </Link>
      </div>
    </section>
  );
};
export default Post;
