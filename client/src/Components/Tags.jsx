import React from "react";
import { Link } from "react-router-dom";

export default function Tags({ tags, forFoodPage }) {
  return (
    <div className="flex justify-center my-[2rem]">
      <div
        className="flex flex-wrap gap-3 bg-transparent font-semibold text-white"
        style={{
          justifyContent: forFoodPage ? "start" : "center",
        }}
      >
        {tags.map((tag) => (
          <Link
            className="border-[1px] border-black shadow-[5px_5px_10px_#000000] snap-start p-[15px] rounded-[10px] opacity-[0.8] hover:opacity-[1]"
            key={tag.name}
            to={`/tag/${tag.name}`}
          >
            {tag.name}
            {!forFoodPage && `(${tag.count})`}
          </Link>
        ))}
      </div>
    </div>
  );
}
