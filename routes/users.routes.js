const express = require("express");
const {
  createUser,
  deleteUser,
  getAllOrders,
  getOrder,
  login,
  updateUser,
  getAllUser,
} = require("../controllers/user.controller");
const { protectSession, protectUsersAccount } = require("../middlewares/auth.middlewares");
const { orderExist } = require("../middlewares/order.middleware");

const { userExist } = require("../middlewares/user.middleware");
const {
  createUsersValidators,
} = require("../middlewares/validators.middlewares");

const usersRoute = express.Router();

usersRoute.post("/signup", createUsersValidators, createUser);

usersRoute.post("/login", login);

//Protected session

usersRoute.use(protectSession);

usersRoute.get("/", getAllUser);

usersRoute.patch("/:id", userExist, protectUsersAccount, updateUser);

usersRoute.delete("/:id", userExist, protectUsersAccount, deleteUser);

usersRoute.get("/orders", protectUsersAccount, getAllOrders);

usersRoute.get("/orders/:id", orderExist, protectUsersAccount, getOrder);

module.exports = { usersRoute };
