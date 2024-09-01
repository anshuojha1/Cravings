import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchIcon from "../Assets/SearchIcon.svg";
const searchVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};
export default function SearchBar() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const { searchTerm } = useParams();
  const search = async () => {
    term ? navigate("/search/" + term) : navigate("/");
  };
  useEffect(() => {
    setTerm(searchTerm ?? "");
  }, [searchTerm]);
  return (
    <div className="relative flex items-center justify-center p-[10px]">
      <motion.input
        variants={searchVariants}
        initial="initial"
        animate="animate"
        className="placeholder-white  focus:outline-none flex opacity-[0.8] hover:opacity-[1.5] rounded-[10px] p-[5px] px-[10px] shadow-[5px_5px_10px_#000000] text-white bg-transparent border-black border-[1px]"
        type="text"
        placeholder="Search Food"
        onChange={(e) => setTerm(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && search()}
        value={term}
      />
      <span className="cursor-pointer relative right-[35px]" onClick={search}>
        <img
          variants={searchVariants}
          initial="initial"
          animate="animate"
          className="rounded-[100%] drop-shadow-[2px_2px_0px_#fff]"
          src={SearchIcon}
          alt="searchIcon"
        />
      </span>
    </div>
  );
}
