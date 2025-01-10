import SinglePost from "@/components/Post/SinglePost";
import Tag from "@/components/Tag/Tag";
import { getAllTags, getPostsForTopPage } from "@/lib/notionAPI";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async () => {
  const fourPosts = await getPostsForTopPage(4);
  const allTags = await getAllTags();

  return {
    props: {
      fourPosts,
      allTags,
    },
    revalidate: 60,
  };
};
type Post = {
  id: string;
  Name: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  isPaginationPage: boolean;
};
export default function Home({
  fourPosts,
  allTags,
}: {
  fourPosts: Post[];
  allTags: string[];
}) {
  return (
    <div className="container h-full w-full mx-auto font-sans ">
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
      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">
          ～Tech and etc.～
        </h1>
        {fourPosts.map((post) => (
          <div className="mx-4" key={post.id}>
            <SinglePost
              Name={post.Name}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
              isPaginationPage={false}
            />
          </div>
        ))}

        <Link
          href="/posts/page/1"
          className="mb-6 lg:w-1/2 mx-auto px-5 block text-right"
        >
          ...もっと見る
        </Link>
        <Tag tags={allTags} />
      </main>
    </div>
  );
}
