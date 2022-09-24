const express = require("express");
const {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");
const { protectSession } = require("../middlewares/auth.middlewares");
const { mealExist } = require("../middlewares/meal.middleware");

const { orderExist } = require("../middlewares/order.middleware");
const {
  createordersValidators,
} = require("../middlewares/validators.middlewares");

const ordersRoute = express.Router();

ordersRoute.use(protectSession);

ordersRoute.get("/me", getAllOrders);

ordersRoute.post("/", mealExist, createordersValidators, createOrder);

ordersRoute.patch("/:id", orderExist, updateOrder);

ordersRoute.delete("/:id", orderExist, deleteOrder);

module.exports = { ordersRoute };
