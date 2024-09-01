import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../Assets/Logo.gif";
import { useCart } from "../Hooks/useCart";
import { useAuth } from "../Hooks/useAuth";
import cartIcon from "../Assets/cartIcon.svg";
export default function Header() {
  const [options, setOptions] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  useEffect(() => {
    if (options) {
      setTimeout(() => {
        setOptions(!options);
      }, 5000);
    }
  }, [options]);

  const firstName = (name) => {
    const nextInd = name.indexOf(" ");
    return nextInd !== -1 ? name.substring(0, nextInd) : name;
  };
  return (
    <header>
      <div className="flex justify-between p-[15px] text-center text-white">
        <Link to="/">
          <img className="w-[10rem] md:w-[15rem]" src={Logo} alt="logo" />
        </Link>
        <nav className="flex justify-center items-center font-bold uppercase md:mr-[2rem]">
          <ul className="flex items-center gap-2 text-[20px] relative border-[1px] border-black px-[10px] rounded-[10px] shadow-[inset_2px_2px_10px_#092b2d]">
            {user ? (
              <li className="p-[5px] rounded-[10px]">
                <Link
                  onClick={() => {
                    setOptions(!options);
                  }}
                >
                  {firstName(user.name)}
                </Link>
                <motion.div
                  className={`z-[10000] absolute top-[55px] right-[30px] transition-all flex flex-col gap-4 backdrop-blur-[80px] shadow-[10px_10px_5px_#000] border-[1px] border-black p-[15px] z-100 ${
                    !options && "hidden"
                  } rounded-md`}
                >
                  <Link
                    className="p-[5px] rounded-[10px]"
                    to="/profile"
                  >
                    Profile
                  </Link>
                  <Link
                    className="p-[5px] rounded-[10px]"
                    to="/orders"
                  >
                    Orders
                  </Link>
                  <a
                    className="p-[5px] rounded-[10px] cursor-pointer"
                    onClick={logout}
                  >
                    LogOut
                  </a>
                </motion.div>
              </li>
            ) : (
              <Link to="/login">Login</Link>
            )}
            <li className="relative flex justify-center items-center p-[5px] rounded-[10px]">
              <Link to="/cart">
                <img className="w-[40px]" src={cartIcon} alt="cartIcon" />
                <span className="absolute top-0 right-0 bg-[#750E21] rounded-[100%] text-[15px] w-5 aspect-square">
                  {cart.totalCount}
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
