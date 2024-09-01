import React, { useEffect, useState } from "react";
import { getNewOrderForCurrentUser } from "../routes/OrderRoutes";
import OrderItems from "../Components/OrderItems";
import Map from "../Components/Map";
import { useNavigate } from "react-router-dom";
import PaypalButtons from "../Components/PaypalButtons";
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

const generalVariant = {
  initial: {
    scale: 0,
    opacity: 0,
    y: 50,
  },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

export default function PaymentPage() {
  const [order, setOrder] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getNewOrderForCurrentUser().then((data) => setOrder(data));
  }, []);

  if (!order) return;

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-around">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="px-[30px] text-white"
        >
          <motion.div
            variants={item}
            className="text-[40px] font-extrabold text-white drop-shadow-[4px_4px_2px_#000] mb-[1rem]"
          >
            Order Form
          </motion.div>
          <div className="pb-[20px] flex flex-col gap-1">
            <motion.div variants={item} className="flex">
              <h2 className="basis-[30%]">Name:</h2>
              <span>{order.name}</span>
            </motion.div>
            <motion.div variants={item} className="flex">
              <h2 className="basis-[30%]">Address:</h2>
              <span>{order.address}</span>
            </motion.div>
          </div>
          <motion.div
            variants={item}
            className="flex justify-center lg:justify-start"
          >
            <OrderItems order={order} />
          </motion.div>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="px-[30px] flex flex-col items-center lg:items-start"
        >
          <motion.div
            variants={item}
            className="text-[30px] md:text-[40px] font-extrabold text-white drop-shadow-[4px_4px_2px_#000] mb-[1rem] mt-[2rem] lg:mt-0"
          >
            Your Location
          </motion.div>
          <motion.div variants={item}>
            <Map location={order.addressLatLng} readonly={true} />
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        variants={generalVariant}
        initial="initial"
        animate="animate"
        className="flex justify-center items-center mt-5"
      >
        <PaypalButtons order={order} />
      </motion.div>
    </div>
  );
}
