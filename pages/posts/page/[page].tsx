import Pagination from "@/components/Pagination/Pagination";
import SinglePost from "@/components/Post/SinglePost";
import { getNumberOfPages, getPostsByPage } from "@/lib/notionAPI";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

export const getStaticPaths: GetStaticPaths = async () => {
  const numberOfPage = await getNumberOfPages();

  const params = [];
  for (let i = 1; i <= numberOfPage; i++) {
    params.push({ params: { page: i.toString() } });
  }

  return {
    paths: params,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage = context.params?.page;
  if (typeof currentPage !== "string" || isNaN(Number(currentPage))) {
    return {
      notFound: true, 
    };
  }
  const postsByPage = await getPostsByPage(
    parseInt(currentPage.toString(), 10)
  );
  const numberOfPage = await getNumberOfPages();
  // console.log(numberOfPage);
  return {
    props: {
      postsByPage,
      numberOfPage,
    },
    revalidate: 60,
  };
};
type Post = {
  Name: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
};
type BlogPageListProps = {
  postsByPage: Post[]; // Array of Post objects
  numberOfPage: number; // Total number of pages
};

const BlogPageList = ({ postsByPage, numberOfPage }: BlogPageListProps) => {
  return (
    <div className="container h-full w-full mx-auto font-mono">
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
      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mb-16 ">
        ～Tech and etc.～
        </h1>
        <section className="sm:grid grid-cols-2 w-5/6 gap-3 mx-auto">
          {postsByPage.map((post: Post) => (
            <div key={post.slug}>
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
        <Pagination numberOfPage={numberOfPage} />
      </main>
    </div>
  );
};

export default BlogPageList;
