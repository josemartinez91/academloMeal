const express = require("express");
const {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  createRestaurantReview,
  updateRestaurantReview,
  deleteRestaurantReview,
} = require("../controllers/restaurant.controller");
const { protectSession, ProctectAdminUser, proctectReviewOwner } = require("../middlewares/auth.middlewares");

const { restaurantExist } = require("../middlewares/restaurant.middleware");
const { reviewExist } = require("../middlewares/review.middleware");
const {
  createRestaurantsValidators,
  createReviewValidators,
} = require("../middlewares/validators.middlewares");

const restaurantsRoute = express.Router();

restaurantsRoute.get("/", getAllRestaurants);

restaurantsRoute.get("/:id", restaurantExist, getRestaurant);

//Protected session

restaurantsRoute.use(protectSession);

restaurantsRoute.post("/", createRestaurantsValidators, createRestaurant);

restaurantsRoute.patch("/:id", restaurantExist, ProctectAdminUser, updateRestaurant);

restaurantsRoute.delete("/:id", restaurantExist, ProctectAdminUser, deleteRestaurant);

restaurantsRoute.post(
  "/reviews/:restaurantId",
  restaurantExist,
  createReviewValidators,
  createRestaurantReview
);

restaurantsRoute.patch("/reviews/:id", reviewExist, proctectReviewOwner, updateRestaurantReview);

restaurantsRoute.delete("/reviews/:id", reviewExist, proctectReviewOwner, deleteRestaurantReview);

module.exports = { restaurantsRoute };
