import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import Price from "./Price";
import { motion } from "framer-motion";

export default function Thumbnails({ foods }) {
  return (
    <motion.ul
      animate={{
        transition: {
          delayChildren: 0.5,
          staggerChildren: 0.4,
        },
      }}
      className="flex items-center justify-center flex-wrap mt-[20px] pb-[20px]"
    >
      {foods.map((food) => (
        <motion.li
          initial={{
            y: 50,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
              duration: 1,
              type: "spring",
              stiffness: 300,
              damping: 30,
            },
          }}
          className="shadow-[5px_5px_10px_#000000] h-[20rem] w-[18rem] border-[1px] rounded-[1rem] m-[0.5rem] flex flex-col overflow-hidden bg-slate-200"
          key={food.id}
        >
          <Link to={`/food/${food.id}`}>
            <img
              className="object-cover h-[14rem]"
              src={`${food.imageUrl}`}
              alt={food.name}
            />
            <div className="flex flex-col justify-between gap-2 px-[8px] pt-[2px]">
              <div className="flex justify-between items-center">
                <div className="uppercase font-semibold">{food.name}</div>
                <StarRating stars={food.stars} />
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  {food.origins.map((origin) => (
                    <span
                      className="bg-white rounded-[5px] px-[4px] text-[10px] uppercase"
                      key={origin}
                    >
                      {origin}
                    </span>
                  ))}
                </div>
                <div>
                  <span>⏱️</span>
                  {food.cookTime}
                </div>
              </div>
              <div>
                <Price price={food.price} />
              </div>
            </div>
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
}
