import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import React, { useEffect } from "react";
import { useLoading } from "../Hooks/useLoading";
import { pay } from "../routes/OrderRoutes";
import { useCart } from "../Hooks/useCart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function PaypalButtons({ order }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AW_gmwpXrO0RyWbPOUmZJH-AQ0-ZlC4hhadKegFT_R5PWzpalQNilV0WUnRSCUzGjcdQEfMUzxZBeMF-",
      }}
    >
      <Buttons order={order} />
    </PayPalScriptProvider>
  );
}

function Buttons({ order }) {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [{ isPending }] = usePayPalScriptReducer();
  const { showLoading, hideLoading } = useLoading();
  useEffect(() => {
    isPending ? showLoading() : hideLoading();
  });

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: order.totalPrice,
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const payment = await actions.order.capture();
      const orderId = await pay(payment.id);
      clearCart();
      // console.log("details", payment, orderId);
      toast.success("Payment Successful", "Success");
      navigate("/track/" + orderId, { state: orderId });
    } catch (error) {
      toast.error("Payment Failed", "Error");
    }
  };

  const onError = (err) => {
    toast.error("Payment Failed With Error", "Error");
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onError}
    />
  );
}
