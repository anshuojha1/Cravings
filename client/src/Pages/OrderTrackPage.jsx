import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { trackOrderById } from "../routes/OrderRoutes";
import NotFound from "../Components/NotFound";
import DateTime from "../Components/DateTime";
import OrderItems from "../Components/OrderItems";
import PaymentIcon from "../Assets/paymentIcon.svg";
import Map from "../Components/Map";
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

export default function OrderTrackPage() {
  const location = useLocation();
  const orderId = location.state;
  console.log("This is my orderID", orderId);
  const [order, setOrder] = useState();
  useEffect(() => {
    orderId && trackOrderById(orderId).then((order) => setOrder(order));
  }, []);
  if (!orderId)
    return <NotFound message="order not found" linkText="Go to Home Page" />;
  return (
    order && (
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
              Order Placed
            </motion.div>
            <div className="pb-[20px] flex flex-col gap-1">
              <motion.div variants={item} className="flex">
                <h2 className="basis-[30%]">Order:</h2>
                <span>{order.id}</span>
              </motion.div>
              <motion.div variants={item} className="flex">
                <h2 className="basis-[30%]">Date:</h2>
                <DateTime date={order.createdAt} />
              </motion.div>
              <motion.div variants={item} className="flex">
                <h2 className="basis-[30%]">Name:</h2>
                <span>{order.name}</span>
              </motion.div>
              <motion.div variants={item} className="flex">
                <h2 className="basis-[30%]">Address:</h2>
                <span>{order.address}</span>
              </motion.div>
              <motion.div variants={item} className="flex">
                <h2 className="basis-[30%]">Status:</h2>
                <span>{order.status}</span>
              </motion.div>
              {order.paymentId && (
                <motion.div variants={item} className="flex">
                  <h2 className="basis-[30%]">Payment ID:</h2>
                  <span>{order.paymentId}</span>
                </motion.div>
              )}
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
        {order.status === "NEW" && (
          <div className="flex justify-center mt-[1rem]">
            <Link to="/payment">
              <motion.button
                variants={generalVariant}
                initial="initial"
                animate="animate"
                className="text-white uppercase shadow-[5px_5px_10px_#fff] scale-[1] hover:scale-[1.05] transition-all duration-50 ease-in flex items-center gap-2 w-fit px-[10px] py-[5px] text-[20px] rounded-[15px] border-[1px] border-black"
              >
                <span>
                  <img src={PaymentIcon} alt="CheckoutIcon" />
                </span>
                Proceed To Payment
              </motion.button>
            </Link>
          </div>
        )}
      </div>
    )
  );
}
