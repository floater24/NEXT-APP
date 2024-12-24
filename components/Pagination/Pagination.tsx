import { getPageLink } from "@/lib/blog.helper";
import Link from "next/link";
import React from "react";

interface Props {
  numberOfPage: number;
  tag?: string;
}

const Pagination = (props: Props) => {
  const { numberOfPage, tag } = props;
//指定されたページ数に基づいて、ページ番号の配列を生成
  const pages: number[] = [];
  for (let i = 1; i <= numberOfPage; i++) {
    pages.push(i);
  }

  return (
    <section className="mb-8 lg:w-1/2 mx-auto rounded-md p-5">
      <ul className="flex items-center justify-center gap-4">
        {pages.map((page) => (
          <li
            className="bg-stone-900 rounded-lg w-6 h-8 relative hover:animate-bounce hover:bg-stone-700"
            key={page}
          >
            <Link
              href={getPageLink(tag || "", page)}
              className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-slate-100"
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Pagination;
