const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");
const { Review } = require("../models/review.model");

const reviewExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({ where: { id } });

  if (!review) {
    return next(new AppError("Review not found", 404));
  }

  req.review = review;

  next();
});

module.exports = { reviewExist };
