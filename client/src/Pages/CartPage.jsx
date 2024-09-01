import React from "react";
import { useCart } from "../Hooks/useCart";
import { Link } from "react-router-dom";
import Price from "../Components/Price";
import deleteIcon from "../Assets/deleteIcon.svg";
import cartCheckoutIcon from "../Assets/cartCheckoutIcon.svg";
import NotFound from "../Components/NotFound";
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

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function CartPage() {
  const { cart, removeFromCart, changeQuantity } = useCart();

  return (
    <>
      <div className="text-center text-[40px] font-extrabold text-white drop-shadow-[4px_4px_2px_#000] mb-[1rem]">
        FOOD CART
      </div>
      {cart.items.length === 0 ? (
        <NotFound message={"Cart Page Empty!!"} />
      ) : (
        <div className="flex lg:flex-row flex-col lg:items-start items-center gap-4 mt-[0.5rem] m-[1.5rem] justify-center lg:justify-between text-white lg:p-[20px]">
          <motion.ul
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4 grow lg:px-[20px]"
          >
            {cart.items.map((item) => (
              <motion.li
                variants={itemVariants}
                className="grid grid-cols-5 items-center border-[1px] border-black py-[10px] px-[8px] md:px-0 rounded-[10px] shadow-[5px_5px_10px_#000]"
                key={item.food}
              >
                <div className="flex justify-center items-center">
                  <img
                    className="md:w-[5rem] md:h-[5rem] w-[3rem] h-[3rem] rounded-[100%] object-cover border-[2px] border-teal-600"
                    src={`${item.food.imageUrl}`}
                    alt={item.food.name}
                  />
                </div>
                <div className="lg:uppercase md:text-[20px] text-[10px] font-semibold">
                  <Link to={`/food/${item.food.id}`}>{item.food.name}</Link>
                </div>
                <div className="flex items-center md:gap-4 gap-2 md:text-[20px] ml-[5px] lg:ml-0 text-[10px] text-center">
                  <div
                    onClick={() => changeQuantity(item, item.quantity - 1)}
                    className="cursor-pointer border-[1px] border-black rounded-[2px] w-[15px] md:w-[30px] aspect-square shadow-[3px_3px_4px_#000]"
                  >
                    -
                  </div>
                  <div>{item.quantity}</div>
                  <div
                    onClick={() => changeQuantity(item, item.quantity + 1)}
                    className="cursor-pointer border-[1px] border-black rounded-[2px] w-[15px] md:w-[30px] aspect-square shadow-[3px_3px_4px_#000]"
                  >
                    +
                  </div>
                </div>
                <div className="text-[10px] md:text-[20px] ml-[10px] md:ml-0 ">
                  <Price price={item.price} />
                </div>
                <button
                  onClick={() => removeFromCart(item.food.id)}
                  className="hover:shadow-[5px_5px_8px_#000000] scale-[1] hover:scale-[1.05] transition-all duration-50 ease-in flex items-center gap-2 w-fit px-[10px] py-[5px] text-[10px] md:text-[20px] md:uppercase rounded-[15px] border-[1px] border-black"
                >
                  Remove
                </button>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="opacity-[0.8] hover:opacity-[1.5] h-[20rem] w-full md:w-[25rem] border-[1px] border-black px-[30px] py-[20px] rounded-[20px] shadow-[8px_8px_8px_#000000]"
          >
            <motion.div
              variants={itemVariants}
              className="text-center text-black font-extrabold text-[40px] mb-[20px]"
            >
              CHECKOUT
            </motion.div>
            <div className="flex flex-col gap-3 text-[20px]">
              <motion.div
                variants={itemVariants}
                className="flex justify-between"
              >
                <span>Total Items:</span>
                <span>{cart.totalCount}</span>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex justify-between"
              >
                <span>Total Amount: </span>
                <Price price={cart.totalPrice} />
              </motion.div>
              <Link className="flex justify-center" to="/checkout">
                <motion.button
                  variants={itemVariants}
                  className="shadow-[5px_5px_8px_#000000] flex items-center gap-2 w-fit px-[10px] py-[5px] text-[20px] rounded-[15px] border-[1px] border-black"
                >
                  <span>
                    <img src={cartCheckoutIcon} alt="CheckoutIcon" />
                  </span>
                  Proceed To Checkout
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
