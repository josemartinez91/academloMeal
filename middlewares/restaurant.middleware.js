const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");
const { Restaurant } = require("../models/restaurant.model");

const restaurantExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({ where: { id } });

  if (!restaurant) {
    return next(new AppError("Restaurant not found", 404));
  }

  req.restaurant = restaurant;

  next();
});

module.exports = { restaurantExist };
