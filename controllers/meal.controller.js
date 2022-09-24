const { Meal } = require("../models/meal.model");
const { catchAsync } = require("../utils/catchAsync.util");

const getAllMeals = catchAsync(async (req, res, next) => {
  const meal = await Meal.findAll({
    where: { status: "active" },
  });

  res.status(200).json({
    status: "success",
    data: { meal },
  });
});

const getMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  res.status(200).json({
    status: "success",
    data: { meal },
  });
});

const createMeal = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, price } = req.body;

  const newMeal = await Meal.create({
    name,
    price,
    restaurantId: restaurant.id,
  });

  res.status(200).json({
    status: "success",
    data: { newMeal },
  });
});

const updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;

  await meal.update({ name, price });

  res.status(200).json({
    status: "success",
    data: { meal },
  });
});

const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: "delete" });

  res.status(200).json({
    status: "success",
  });
});

module.exports = { getAllMeals, getMeal, createMeal, updateMeal, deleteMeal };
