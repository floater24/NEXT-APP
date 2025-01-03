import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Pagination from "../../../../../components/Pagination/Pagination";
import SinglePost from "../../../../../components/Post/SinglePost";
import {
  getAllTags,
  getNumberOfPagesByTag,
  getPostsByTagAndPage,
} from "../../../../../lib/notionAPI";
import Tag from "@/components/Tag/Tag";
import { FC } from "react";

type Params = {
  params: {
    tag: string;
    page: string;
  };
}[];

export const getStaticPaths: GetStaticPaths = async () => {
  const allTags = await getAllTags();
  const params: Params = [];
  await Promise.all(
    allTags.map((tag: string) => {
      return getNumberOfPagesByTag(tag).then((numberOfPagesByTag: number) => {
        for (let i = 1; i <= numberOfPagesByTag; i++) {
          params.push({ params: { tag: tag, page: i.toString() } });
        }
      });
    })
  );

  return {
    paths: params,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPageParam = context.params?.page;
  const currentTagParam = context.params?.tag;

  const currentPage: string = Array.isArray(currentPageParam)
    ? currentPageParam[0] // 配列の場合は最初の要素を使用
    : currentPageParam || "";

  const currentTag: string = Array.isArray(currentTagParam)
    ? currentTagParam[0] // 配列の場合は最初の要素を使用
    : currentTagParam || "";

  const upperCaseCurrentTag =
    currentTag.charAt(0).toUpperCase() + currentTag.slice(1);

  const posts = await getPostsByTagAndPage(
    upperCaseCurrentTag,
    parseInt(currentPage, 10)
  );

  const numberOfPagesByTag = await getNumberOfPagesByTag(upperCaseCurrentTag);

  const allTags = await getAllTags();

  return {
    props: {
      posts,
      numberOfPagesByTag,
      currentTag,
      allTags,
    },
    revalidate: 60 * 60 * 6,
  };
};
type BlogTagPageListProps = {
  numberOfPagesByTag: number;
  posts: {
    id: string;
    Name: string;
    description: string;
    date: string;
    tags: string[];
    slug: string;
  }[];
  currentTag: string;
  allTags: string[];
};

const BlogTagPageList: FC<BlogTagPageListProps> = ({
  numberOfPagesByTag,
  posts,
  currentTag,
  allTags,
}) => {
  return (
    <div className="container h-full w-full mx-auto">
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
          ～Programming and etc.～
        </h1>
        <section className="sm:grid grid-cols-2 w-5/6 gap-3 mx-auto">
          {posts.map((post) => (
            <div key={post.id}>
              <SinglePost
                Name={post.Name}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
                isPaginationPage={true}
              />
            </div>
          ))}
        </section>
        <Pagination numberOfPage={numberOfPagesByTag} tag={currentTag} />
        <Tag tags={allTags} />
      </main>
    </div>
  );
};
export default BlogTagPageList;
