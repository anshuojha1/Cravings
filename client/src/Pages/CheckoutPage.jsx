import React, { useState } from "react";
import { useCart } from "../Hooks/useCart";
import { Link, useNavigate } from "react-router-dom";
import { CreateOrder } from "../routes/OrderRoutes";
import OrderItems from "../Components/OrderItems";
import Map from "../Components/Map";
import { toast } from "react-toastify";
import PaymentIcon from "../Assets/paymentIcon.svg";
import { motion } from "framer-motion";
import { containerClasses } from "@mui/material";

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

export default function CheckoutPage() {
  const [userdata, setUserData] = useState({
    name: "",
    address: "",
  });
  const { cart } = useCart();
  const navigate = useNavigate();
  const [order, setOrder] = useState({ ...cart });
  const handleSubmit = async () => {
    if (!order.addressLatLng) {
      toast.warning("Please Select Your Location on the MAP");
      return;
    }
    // console.log("This ismy datta", userdata);
    await CreateOrder({
      ...order,
      name: userdata.name,
      address: userdata.address,
    });
    navigate("/payment");
  };
  const handleChange = (e) => {
    setUserData({ ...userdata, [e.target.name]: e.target.value });
  };
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
            Order Details
          </motion.div>
          <div className="pb-[20px] flex flex-col gap-5 justify-center lg:justify-start">
            <motion.input
              variants={item}
              className="placeholder-white w-full focus:outline-none flex opacity-[0.8] hover:opacity-[1.5] rounded-[10px] p-[5px] px-[10px] shadow-[5px_5px_10px_#000000] text-white bg-transparent border-black border-[1px]"
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Enter Your Name"
            />
            <motion.input
              variants={item}
              className="placeholder-white w-full focus:outline-none flex opacity-[0.8] hover:opacity-[1.5] rounded-[10px] p-[5px] px-[10px] shadow-[5px_5px_10px_#000000] text-white bg-transparent border-black border-[1px]"
              type="text"
              name="address"
              onChange={handleChange}
              placeholder="Enter Your Address"
            />
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
            Find my location
          </motion.div>
          <motion.div variants={item}>
            <Map
              location={order.adressLatLng}
              onChange={(latlng) => {
                console.log(latlng);
                setOrder({ ...order, addressLatLng: latlng });
              }}
            />
          </motion.div>
        </motion.div>
      </div>
      <div className="flex justify-center mt-[1rem]">
        <Link>
          <motion.button
            variants={generalVariant}
            initial="initial"
            animate="animate"
            onClick={handleSubmit}
            className="text-white uppercase shadow-[5px_5px_10px_#fff] flex items-center gap-2 w-fit px-[10px] py-[5px] text-[20px] rounded-[15px] border-[1px] border-black"
          >
            <span>
              <img src={PaymentIcon} alt="CheckoutIcon" />
            </span>
            Proceed To Payment
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
