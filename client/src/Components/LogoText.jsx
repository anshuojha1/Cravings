import React from "react";
import { Link } from "react-router-dom";
export default function LogoText() {
  return (
    <Link
      className={`text-[50px] items-center flex font-extrabold drop-shadow-[100px] z-10 text-white`}
      to="/"
    >
      CRAVING'S
    </Link>
  );
}
