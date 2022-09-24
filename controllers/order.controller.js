const { Order } = require("../models/order.model");
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const getAllOrders = catchAsync(async (req, res, next) => {
  const order = await Order.findAll();

  res.status(200).json({
    status: "success",
    data: { order },
  });
});

const createOrder = catchAsync(async (req, res, next) => {
  const { meal, sessionUser } = req;
  const { quantity, mealId } = req.body;

  const totalPrice = meal.price * quantity;
  if (mealId !== meal.id) {
    return next(new AppError("The meal Id is no correct", 400));
  }
  const newOrder = await Order.create({
    mealId,
    userId: sessionUser.id,
    quantity,
    totalPrice,
  });

  res.status(200).json({
    status: "success",
    data: { newOrder },
  });
});

const updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: "complete" });

  res.status(200).json({
    status: "success",
    data: { order },
  });
});

const deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: "cancelled" });

  res.status(200).json({
    status: "success",
  });
});

module.exports = { getAllOrders, createOrder, updateOrder, deleteOrder };
