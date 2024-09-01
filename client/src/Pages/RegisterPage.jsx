import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");
  const { user, register } = useAuth();
  const initialData = {
    name: "",
    email: "",
    password: "",
    address: "",
  };
  const [userData, setUserData] = useState(initialData);
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    await register(userData);
  };
  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate("/");
  }, [user]);
  return (
    <div className="flex justify-center text-white">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="pb-[20px] px-[20px] flex flex-col justify-center items-center gap-5 text-center backdrop-blur-[10px] border-[1px] border-black shadow-[10px_10px_8px_#000] rounded-[20px] md:min-w-[30rem] md:max-w-[50rem] min-w-[20rem] max-w-[50rem]"
      >
        <motion.div
          variants={item}
          className="uppercase text-[30px] font-extrabold text-[40px] font-extrabold text-white drop-shadow-[4px_4px_2px_#000] mt-[2rem]"
        >
          Register
        </motion.div>
        <motion.input
          variants={item}
          className="placeholder-white w-full focus:outline-none flex opacity-[0.8] hover:opacity-[1.5] rounded-[10px] p-[5px] px-[10px] shadow-[5px_5px_10px_#000000] text-white bg-transparent border-black border-[1px]"
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <motion.input
          variants={item}
          className="placeholder-white w-full focus:outline-none flex opacity-[0.8] hover:opacity-[1.5] rounded-[10px] p-[5px] px-[10px] shadow-[5px_5px_10px_#000000] text-white bg-transparent border-black border-[1px]"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <motion.input
          variants={item}
          className="placeholder-white w-full focus:outline-none flex opacity-[0.8] hover:opacity-[1.5] rounded-[10px] p-[5px] px-[10px] shadow-[5px_5px_10px_#000000] text-white bg-transparent border-black border-[1px]"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <motion.input
          variants={item}
          className="placeholder-white w-full focus:outline-none flex opacity-[0.8] hover:opacity-[1.5] rounded-[10px] p-[5px] px-[10px] shadow-[5px_5px_10px_#000000] text-white bg-transparent border-black border-[1px]"
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />
        <motion.button
          variants={item}
          onClick={handleSubmit}
          className="shadow-[5px_5px_8px_#000000] flex items-center gap-2 w-fit px-[10px] py-[5px] text-[20px] uppercase rounded-[15px] border-[1px] border-black"
        >
          Register User
        </motion.button>
        <motion.hr
          variants={item}
          className="min-w-[20rem] max-w-[30rem] flex justify-center"
        />
        <motion.div
          variants={item}
          className="text-[20px] flex items-center gap-3"
        >
          Already a Member?{" "}
          <Link
            className="border-[1px] border-black p-[2px] px-[5px] rounded-[10px] hover:shadow-[5px_5px_8px_#000000] scale-[1] hover:scale-[1.05] transition-all duration-50 ease-in"
            to={`/login?${returnUrl ? "returnUrl=" + returnUrl : ""}`}
          >
            Login Here
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
