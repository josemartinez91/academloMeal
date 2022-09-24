const express = require("express");
const {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");
const { protectSession, proctectReviewOwner } = require("../middlewares/auth.middlewares");
const { restaurantExist } = require("../middlewares/restaurant.middleware");

const{reviewExist} = require('../middlewares/review.middleware');
const { createReviewValidators } = require("../middlewares/validators.middlewares");

const reviewsRoute = express.Router();

//Protected session

reviewsRoute.use(protectSession)

reviewsRoute.get("/", getAllReviews);

reviewsRoute.post("/", restaurantExist, createReviewValidators, createReview);

reviewsRoute.patch("/:id", reviewExist, proctectReviewOwner, updateReview);

reviewsRoute.delete("/:id", reviewExist, proctectReviewOwner, deleteReview);

module.exports = { reviewsRoute };
