const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const auth = require("../middleware/authMid");
const { BAD_REQUEST, UNAUTHORIZED } = require("../constants/httpSatus");
const OrderModel = require("../models/orderModel");
const UserModel = require("../models/userModel");
const OrderStatus = require("../constants/orderStatus");
router.use(auth);

router.post(
  "/create",
  asyncHandler(async (req, res) => {
    const order = req.body;
    // console.log("bodydata",req.user);
    if (order.items.length <= 0) res.status(BAD_REQUEST).send("Cart Is Empty!");
    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });
    const newOrder = new OrderModel({ ...order, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
  })
);

router.post(
  "/pay",
  asyncHandler(async (req, res) => {
    const { paymentId } = req.body;
    console.log("reached");
    const order = await getNewOrderForCurrentUser(req);
    if (!order) {
      res.status(BAD_REQUEST).send("Order Not Found!!");
      return;
    }
    // console.log("order",order);
    order.paymentId = paymentId;
    order.status = OrderStatus.PAID;
    await order.save();
    res.send(order._id);
  })
);

router.get(
  "/track/:orderId",
  asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const user = await UserModel.findById(req.user.id);
    const filter = {
      _id: orderId,
    };
    if (!user.isAdmin) {
      filter.user = user._id;
    }
    const order = await OrderModel.findOne(filter);
    if (!order) return res.send(UNAUTHORIZED);
    return res.send(order);
  })
);

router.get(
  "/newOrderForCurrentUser",
  asyncHandler(async (req, res) => {
    const order = await getNewOrderForCurrentUser(req);
    if (order) res.send(order);
    else res.status(BAD_REQUEST).send();
  })
);

router.get("/allStatus", (req, res) => {
  const allStatus = Object.values(OrderStatus);
  res.send(allStatus);
});

router.get(
  "/:status?",
  asyncHandler(async (req, res) => {
    const status = req.params.status;
    const user = await UserModel.findById(req.user.id);
    const filter = {};
    if (!user.isAdmin) filter.user = user._id;
    if (status) filter.status = status;
    const orders = await OrderModel.find(filter).sort("-createdAt");
    // console.log("This is my orders", orders);
    res.send(orders);
  })
);

const getNewOrderForCurrentUser = async (req) =>
  await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  });

module.exports = router;
