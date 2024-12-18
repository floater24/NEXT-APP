import React from "react";
import { getAllPosts, getSinglePost } from "../../lib/notionAPI";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Link from "next/link";
import Head from "next/head";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
// import { defaultStyle } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: "blocking",
  };
};
type Params = {
  params: string;
  slug: string;
};
export const getStaticProps = async ({ params }: { params: Params }) => {
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
    index: number;
  };
  markdown: {
    content: string;
    parent: string;
  };
};

const Post = ({ post }: { post: Post }) => {
  return (
    <section className="container px-5 h-auto max-w-3xl mx-auto mt-20">
      <Head>
        <title>Hello, World.</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className="w-full text-2xl font-medium">{post.metadata.Name}</h2>
      <div className="border-b-2 w-1/3 mt-1 border-stone-900"></div>
      <span className="text-gray-500">Posted date at {post.metadata.date}</span>
      <br />
      {post.metadata.tags.map((tag, index) => (
        <p
          className="text-white bg-stone-900 rounded-xl font-medium mt-2 px-2 inline-block mr-2 hover:bg-stone-700"
          key={index}
        >
          <Link href={`/posts/tag/${tag}/page/1`}>{tag}</Link>
        </p>
      ))}
      <div className="mt-10 font-medium break-words">
        <ReactMarkdown
          className="prose prose-lg text-justify leading-relaxed"
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-4xl font-bold my-6" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-3xl font-semibold my-5" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p
                className="text-lg leading-relaxed my-4 text-gray-700"
                {...props}
              />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc list-inside my-4" {...props} />
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
                  maxWidth: "100%", // 横幅を親要素にフィット
                  height: "auto", // 縦横比を維持
                }}
                className="rounded-lg shadow-md my-4"
              />
            ),
            iframe: ({ node, ...props }) => {
              if (props.src && props.src.includes("youtube.com")) {
                return (
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      {...props}
                      className="w-full h-full rounded-lg shadow-lg"
                      allowFullScreen
                    />
                  </div>
                );
              }
              return (
                <iframe
                  {...props}
                  className="w-full h-full rounded-lg shadow-lg"
                />
              );
            },

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
                <SyntaxHighlighter
                  classname="rounded-lg overflow-hidden border-radius: 12px box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) border: 1px solid rgba(255, 255, 255, 0.1)"
                  style={vscDarkPlus}
                  language={match[1]}
                  showLineNumbers={true} /* 行番号を表示 */
                  lineNumberStyle={{
                    color: "#999",
                    fontSize: "0.8em",
                    paddingRight: "1em",
                  }} /* 行番号のスタイル */
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...props}>{String(children)}</code>
              );
            },
          }}
        >
          {post.markdown.parent}
        </ReactMarkdown>

        <Link href="/">
          <span className="pb-20 block mt-3 text-stone-900 hover:text-stone-700">
            &larr;ホームに戻る
          </span>
        </Link>
        <Link href="https://marshmallow-qa.com/12sgnjwewpk4r5w?t=6f43D2&utm_medium=url_text&utm_source=promotion">
          <button className="bg-stone-900 hover:bg-stone-700 text-white font-bold py-2 px-4 border-b-4 border-stone-700 hover:border-stone-500 rounded">
            質問・感想はこちら！
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Post;
