import Link from "next/link";
import React from "react";

type Props = {
  Name: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  isPaginationPage: boolean;
};


const SinglePost = (props: Props) => {
  const { Name, description, date, tags, slug, isPaginationPage } = props;
  return (
    <Link href={`/posts/${slug}`}>
      {isPaginationPage ? (
        <section className="bg-stone-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
          <div className="lg:flex items-center">
            <h2 className="text-gray-100 text-2xl font-medium mb-2">{Name}</h2>
            <div className="text-gray-400 mr-2">{date}</div>
            {tags.map((tag: string, index: number) => (
              <span
                className=" text-white  bg-teal-500 rounded-xl px-2 mr-2 font-medium"
                key={index}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-slate-100">{description}</p>
        </section>
      ) : (
        <section className="lg:w-1/2 bg-stone-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-3">
            <h2 className="text-slate-100 text-2xl font-medium mb-2">{Name}</h2>
            <div className="text-slate-100">{date}</div>
            {tags.map((tag: string, index: number) => (
              <span
                className="bg-teal-500 text-white rounded-xl px-2 font-medium"
                key={index}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-slate-100">{description}</p>
        </section>
      )}
    </Link>
  );
};

export default SinglePost;
