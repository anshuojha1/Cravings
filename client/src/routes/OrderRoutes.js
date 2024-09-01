import { ExpressCheckoutElement } from "@stripe/react-stripe-js";
import axios from "axios";

export const pay = async (paymentId) => {
  try {
    const { data } = await axios.post("/api/orders/pay", { paymentId });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const CreateOrder = async (order) => {
  try {
    const { data } = axios.post("/api/orders/create", order);
    console.log("This is my order", order);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getNewOrderForCurrentUser = async () => {
  const { data } = await axios.get("/api/orders/newOrderForCurrentUser");
  console.log("this is my data", data);
  return data;
};

export const trackOrderById = async (orderId) => {
  const { data } = await axios.get("/api/orders/track/" + orderId);
  return data;
};

export const getAll = async (state) => {
  const { data } = await axios.get(`/api/orders/${state ?? ""}`);
  console.log(data);
  return data;
};

export const getAllStatus = async () => {
  const { data } = await axios.get(`/api/orders/allStatus`);
  return data;
};
