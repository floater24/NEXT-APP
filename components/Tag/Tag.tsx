import Link from "next/link";
import React from "react";
type Props = {
  tags: string[];
};

const Tag = (props: Props) => {
  const { tags } = props;
  return (
    <div className="mx-4">
      <section className="lg:w-1/2 mb-8 mx-auto bg-teal-500 rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 duration-300 transition-all">
        <div className="font-medium mb-4 text-white">Tag</div>
        <div className="flex flex-wrap gap-5">
          {tags.map((tag:string, index:number) => (
            <Link href={`/posts/tag/${tag}/page/1`} key={index}>
              <span className="cursor-pointer px-2 font-medium pb-1 rounded-xl bg-stone-900 hover:bg-stone-700 inline-block text-white">
                {tag}
              </span>
            </Link>
          ))}
    
        </div>
      </section>
    </div>
  );
};

export default Tag;
