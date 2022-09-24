const express = require("express");
const {
  getAllMeals,
  getMeal,
  createMeal,
  updateMeal,
  deleteMeal,
} = require("../controllers/meal.controller");
const { protectSession, ProctectAdminUser } = require("../middlewares/auth.middlewares");

const { mealExist } = require("../middlewares/meal.middleware");
const { restaurantExist } = require("../middlewares/restaurant.middleware");
const {
  createMealsValidator,
} = require("../middlewares/validators.middlewares");

const mealsRoute = express.Router();

mealsRoute.get("/", getAllMeals);

mealsRoute.get("/:id", mealExist, getMeal);

//Protected session

mealsRoute.use(protectSession);

mealsRoute.post("/:id", restaurantExist, createMealsValidator, createMeal); //restaurant id

mealsRoute.patch("/:id", mealExist, ProctectAdminUser, updateMeal);

mealsRoute.delete("/:id", mealExist, ProctectAdminUser, deleteMeal);

module.exports = { mealsRoute };
