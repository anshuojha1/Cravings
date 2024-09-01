import React, { useState } from "react";
import { toast } from "react-toastify";
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

export default function ChangePassword() {
  const { changePassword } = useAuth();
  const [data, setData] = useState({
    CurrentPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  });
  const handleSubmit = async () => {
    if (data.NewPassword !== data.ConfirmPassword) {
      toast.error("Passwords do not Match!!");
      return;
    }
    await changePassword(data);
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="py-[20px] px-[20px] lg:h-[25rem] flex flex-col justify-start items-center gap-5 text-center backdrop-blur-[10px] border-[1px] border-black shadow-[10px_10px_8px_#000] rounded-[20px] w-[20rem] md:w-[30rem]"
    >
      <motion.div
        variants={item}
        className="uppercase text-center text-[25px] md:text-[40px] font-extrabold text-white drop-shadow-[4px_4px_2px_#000]"
      >
        Change Password
      </motion.div>
      <motion.input
        variants={item}
        className="placeholder-white w-full focus:outline-none flex opacity-[0.8] hover:opacity-[1.5] rounded-[10px] p-[5px] px-[10px] shadow-[5px_5px_10px_#000000] text-white bg-transparent border-black border-[1px]"
        type="password"
        name="CurrentPassword"
        placeholder="CurrentPassword"
        onChange={handleChange}
      />
      <motion.input
        variants={item}
        className="placeholder-white w-full focus:outline-none flex opacity-[0.8] hover:opacity-[1.5] rounded-[10px] p-[5px] px-[10px] shadow-[5px_5px_10px_#000000] text-white bg-transparent border-black border-[1px]"
        type="password"
        name="NewPassword"
        placeholder="NewPassword"
        onChange={handleChange}
      />
      <motion.input
        variants={item}
        className="placeholder-white w-full focus:outline-none flex opacity-[0.8] hover:opacity-[1.5] rounded-[10px] p-[5px] px-[10px] shadow-[5px_5px_10px_#000000] text-white bg-transparent border-black border-[1px]"
        type="password"
        name="ConfirmPassword"
        placeholder="ConfirmPassword"
        onChange={handleChange}
      />
      <motion.button
        variants={item}
        onClick={handleSubmit}
        className="text-white shadow-[5px_5px_8px_#000000] flex items-center gap-2 w-fit px-[10px] py-[5px] text-[15px] md:text-[20px] md:uppercase rounded-[15px] border-[1px] border-black"
      >
        Change Password
      </motion.button>
    </motion.div>
  );
}
