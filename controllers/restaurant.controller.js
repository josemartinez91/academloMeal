const { Restaurant } = require("../models/restaurant.model");
const { Review } = require("../models/review.model");
const { catchAsync } = require("../utils/catchAsync.util");

const getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findAll({
    where:{status:"active"},
    include:[{model:Review}]
  });

  res.status(200).json({
    status: "success",
    data: { restaurant },
  });
});

const getRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(200).json({
    status: "success",
    data: { restaurant },
  });
});

const createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({ name, address, rating });

  res.status(200).json({
    status: "success",
    data: { newRestaurant },
  });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { name, address } = req.body;
  const { restaurant } = req;

  await restaurant.update({ name, address });

  res.status(200).json({
    status: "success",
    data: { restaurant },
  });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: "delete" });

  res.status(200).json({
    status: "success",
  });
});

const createRestaurantReview = catchAsync(async (req, res, next) => {
  const { restaurant, sessionUser } = req;
  const { comment, rating } = req.body;

  const newReview = await Restaurant.create({
    comment,
    userId: sessionUser.id,
    restaurantId: restaurant.id,
    rating,
  });

  res.status(200).json({
    status: "success",
    data: { newReview },
  });
});

const updateRestaurantReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { review } = req;

  await review.update({ comment, rating });

  res.status(200).json({
    status: "success",
    data: { review },
  });
});

const deleteRestaurantReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: "delete" });

  res.status(200).json({
    status: "success",
  });
});

module.exports = {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  createRestaurantReview,
  updateRestaurantReview,
  deleteRestaurantReview,
};
