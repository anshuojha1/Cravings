import React from "react";
import { Link } from "react-router-dom";
import homeIcon from "../Assets/homeIcon.svg";

export default function NotFound({ message, linkRoute, linkText }) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center text-white">
      <div className="text-[30px] uppercase font-extrabold drop-shadow-[4px_4px_0px_#000]">
        {message}
      </div>
      <Link to={linkRoute}>
        <button className="hover:shadow-[5px_5px_8px_#000000] scale-[1] hover:scale-[1.05] transition-all duration-50 ease-in flex items-center gap-2 w-fit px-[10px] py-[5px] text-[20px] uppercase rounded-[15px] border-[1px] border-black">
          <span>
            <img src={homeIcon} alt="homeIcon" />
          </span>{" "}
          {linkText}
        </button>
      </Link>
    </div>
  );
}

NotFound.defaultProps = {
  message: "OOP's!! Nothing Found",
  linkRoute: "/",
  linkText: "Go to Home",
};
