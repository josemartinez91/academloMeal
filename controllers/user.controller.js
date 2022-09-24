const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { AppError } = require("../utils/appError.util");

const { User } = require("../models/user.model");
const{Order} = require('../models/order.model')
const { catchAsync } = require("../utils/catchAsync.util");

dotenv.config({ path: "./config.env" });

const getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.findAll();

  res.status(200).json({
    status: "success",
    data: { users },
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (role !== "admin" && role !== "normal") {
    return next(new AppError("Invalid role", 400));
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    data: { newUser },
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const { user } = req;

  await user.update({ name });

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: "delete" });

  res.status(200).json({
    status: "success",
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, status: "active" } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Wrong credentials", 400));
  }

  user.password = undefined;

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({
    status: "success",
    data: { user, token },
  });
});

const getAllOrders = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    include:[
      {model:Order}
    ]
  });

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

const getOrder = catchAsync(async (req, res, next) => {
  const {order} = req
  const users = await User.findOne(order);

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  login,
  getAllOrders,
  getOrder,
};
