import { NUMBER_OF_POSTS_PER_PAGE } from "@/constants/constants";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});


const n2m = new NotionToMarkdown({ notionClient: notion });
export const getAllPosts = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATADASE_ID!,
    page_size: 100,
    filter: {
      property: "Published",
      checkbox: {
        equals:true,
      },
    },
    sorts: [{ property: "Date",
      direction: "descending",
     }],
  });

  console.log("Notion Database ID:", process.env.NOTION_DATADASE_ID);

  const allPosts = posts.results;

  return allPosts.map((post) => {
    return getPageMetaData(post);
  });
};
type Post = {
  id: string;
  properties: {
    Name: { title: { plain_text: string }[] };
    Description: { rich_text: { plain_text: string }[] };
    Date: { date: { start: string } };
    Slug: { rich_text: { plain_text: string }[] };
    Tags: { multi_select: { name: string }[] };
  };
};
type Tag = {
  name: string;
};
type Tags = Tag[];
const getPageMetaData = (post:Post) => {
  const getTags = (tags:Tags) => {
    return tags?.map((tag) => tag.name) || [];
  };
  // console.log(post);

  
  return {
    id: post.id,
    Name: post.properties?.Name?.title?.[0]?.plain_text || "Untitled",
    description: post.properties.Description.rich_text[0].plain_text,
    date: post.properties?.Date?.date?.start || "",
    slug: post.properties?.Slug?.rich_text?.[0]?.plain_text || "",
    tags: getTags(post.properties?.Tags?.multi_select || []),
  };
};

export const getSinglePost = async (slug) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATADASE_ID,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  const page = response.results[0];
  const metadata = getPageMetaData(page);

  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdBlocks);
  // console.log(mdString);
  return {
    metadata,
    markdown: mdString,
  };
};
// Topページ用記事の取得（4つ）//
export const getPostsForTopPage = async (pageSize: number) => {
  const allPosts = await getAllPosts();
  const fourPosts = allPosts.slice(0, pageSize);
  return fourPosts;
};
// ページ番号に応じた記事取得//
export const getPostsByPage = async (page: number) => {
  const allPosts = await getAllPosts();

  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;

  return allPosts.slice(startIndex, endIndex);
};

export const getNumberOfPages = async () => {
  const allPosts = await getAllPosts();

  return (
    Math.floor(allPosts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (allPosts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  );
};

export const getPostByTagAndPage = async (tagName: string, page: number) => {
  const allPosts = await getAllPosts();
  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;

  return allPosts.slice(startIndex, endIndex);
};
export const getPostsByTagAndPage = async (tagName: string, page: number) => {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter((post) =>
    post.tags.find((tag: string) => tag === tagName)
  );

  // console.log(posts);
  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;

  return posts.slice(startIndex, endIndex);
};

export const getNumberOfPagesByTag = async (tagName: string) => {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter((post) =>
    post.tags.find((tag: string) => tag === tagName)
  );

  return (
    Math.floor(posts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (posts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  );
};

export const getAllTags = async () => {
  const allPosts = await getAllPosts();

  const allTagsDuplicationLists = allPosts.flatMap((post) => post.tags);
  const set = new Set(allTagsDuplicationLists);
  const allTagsList = Array.from(set);
  //console.log(allTagsList);

  return allTagsList;
};
