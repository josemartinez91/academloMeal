const { Review } = require("../models/review.model");
const { catchAsync } = require("../utils/catchAsync.util");

const getAllReviews = catchAsync(async (req, res, next) => {
  const review = await Review.findAll();

  res.status(200).json({
    status: "success",
    data: { review },
  });
});

const createReview = catchAsync(async (req, res, next) => {
  const { restaurant, sessionUser } = req;
  const { comment, rating } = req.body;

  const newReview = await Review.create({
    comment,
    rating,
    restaurantId: restaurant.Id,
    userId: sessionUser.id,
  });

  res.status(200).json({
    status: "success",
    data: { newReview },
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { review } = req;

  await review.update({ comment, rating });

  res.status(200).json({
    status: "success",
    data: { review },
  });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: "delete" });

  res.status(200).json({
    status: "success",
  });
});

module.exports = { getAllReviews, createReview, updateReview, deleteReview };
