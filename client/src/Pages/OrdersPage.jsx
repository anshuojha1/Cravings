import React, { useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import { getAll, getAllStatus } from "../routes/OrderRoutes";
import DateTime from "../Components/DateTime";
import Price from "../Components/Price";
import NotFound from "../Components/NotFound";

const initialState = {};
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ALL_STATUS_FETCHED":
      return { ...state, allStatus: payload };
    case "ORDERS_FETCHED":
      return { ...state, orders: payload };
    default:
      return state;
  }
};
export default function OrdersPage() {
  const [{ allStatus, orders }, dispatch] = useReducer(reducer, initialState);
  const { filter } = useParams();
  useEffect(() => {
    getAllStatus().then((status) => {
      dispatch({ type: "ALL_STATUS_FETCHED", payload: status });
    });
    getAll(filter).then((orders) => {
      console.log(orders);
      dispatch({ type: "ORDERS_FETCHED", payload: orders });
    });
  }, [filter]);

  return (
    <div className="text-white flex flex-col justify-center items-center">
      <div className="text-center text-[40px] font-extrabold text-white drop-shadow-[4px_4px_2px_#000]">
        OrderPage
      </div>
      <div className="flex justify-center my-[1rem]">
        <Link
          className="border-[1px] border-black focus:bg-blue-400 mr-[1rem] shadow-[5px_5px_10px_#000000] h-fit px-[15px] py-[10px] rounded-[10px] opacity-[0.8] hover:opacity-[1]"
          to={`/orders/`}
        >
          ALL
        </Link>
        {allStatus && (
          <div className="flex flex-wrap gap-3 w-fit bg-transparent font-semibold text-white]">
            {allStatus.map((state) => (
              <Link
                className="border-[1px] border-black focus:bg-blue-400 shadow-[5px_5px_10px_#000000] px-[15px] py-[10px] rounded-[10px] opacity-[0.8] hover:opacity-[1]"
                key={state}
                to={`/orders/${state}`}
              >
                {state}
              </Link>
            ))}
          </div>
        )}
      </div>

      {orders?.length === 0 && (
        <NotFound
          linkRoute={filter ? "/orders" : "/"}
          linkText={filter ? "Show All" : "Go to Home Page"}
        />
      )}
      <div className="flex flex-col gap-[15px] p-[20px] mt-[2rem] lg:mt-0 items-center h-[28rem] w-fit overflow-y-scroll snap-y snap-mandatory">
        {orders &&
          orders.map((order) => (
            <div
              className="snap-start flex flex-col gap-2 divide-black p-[5px] grow border-[1px] border-black w-[25rem] md:w-[40rem] lg:w-[50rem] shadow-[5px_5px_10px_#000] rounded-[10px]"
              key={order.id}
            >
              <div className="flex justify-between px-[10px] text-[10px] md:text-[15px] lg:text-[20px]">
                <span className="mr-[5px] md:mr-0">{order.id}</span>
                <span className="mr-[5px] md:mr-0">
                  <DateTime date={order.createdAt} />
                </span>
                <span className="font-extrabold drop-shadow-[4px_4px_2px_#000]">
                  {order.status}
                </span>
              </div>
              <div className="flex gap-1 py-[10px]">
                {order.items.map((item) => (
                  <Link key={item.food.id} to={`/food/${item.food.id}`}>
                    <img
                      className="opacity-[0.8] hover:opacity-[1] h-[3rem] rounded-[10px]"
                      src={item.food.imageUrl}
                      alt={item.food.name}
                    />
                  </Link>
                ))}
              </div>
              <div className="flex justify-between px-[10px]">
                <div>
                  <button className="border-[1px] border-black rounded-[10px] px-[10px] shadow-[2px_2px_5px_#000] scale-[1] hover:scale-[1.05] transition-all duration-50 ease-in">
                    <Link to={`/track/${order.id}`}>Show Order</Link>
                  </button>
                </div>
                <div>
                  <span className="font-extrabold drop-shadow-[4px_4px_2px_#000]">
                    <Price price={order.totalPrice} />
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
