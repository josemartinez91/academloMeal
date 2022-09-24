const { body, validationResult } = require("express-validator");
const { AppError } = require("../utils/appError.util");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);

    const message = errorMessages.join(" ");

    return next(new AppError(message, 400));
  }

  next();
};

const createUsersValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannto be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password")
    .isAlphanumeric()
    .withMessage("Password must have number and letter")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must have 8 character"),
  checkValidations,
];

const createMealsValidator = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty ")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 character"),
  body("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .notEmpty()
    .withMessage("Price cannot be empty")
    .isLength({ max: 6 })
    .withMessage("The price is to high, please check the price"),
  checkValidations,
];

const createordersValidators = [
  body("quantity")
    .isNumeric()
    .withMessage("Quantity must be a number")
    .notEmpty()
    .withMessage("Quantity cannot be empty"),
  body("mealId")
    .isNumeric()
    .withMessage("Meal Id must be a number")
    .notEmpty()
    .withMessage("MealId cannot be empty"),
  checkValidations,
];

const createRestaurantsValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be a leats 3 characters"),
  body("address")
    .isString()
    .withMessage("Address must be a string")
    .notEmpty()
    .withMessage("Address cannot be empty")
    .isLength({ min: 5 })
    .withMessage("Address must be at least 5 character"),
  body("rating")
    .isNumeric()
    .withMessage("Rating must be a number")
    .notEmpty()
    .withMessage("Rating cannot be empty")
    .isLength({ max: 1 })
    .withMessage("Rating must have only one number"),
  checkValidations,
];

const createReviewValidators = [
  body("comment")
    .isString()
    .withMessage("Comment must be a string")
    .notEmpty()
    .withMessage("Comment cannot be empty")
    .isLength({ min: 5 })
    .withMessage("Comment must be at least 5 character"),
  body("rating")
    .isNumeric()
    .withMessage("Rating must be a number")
    .notEmpty()
    .withMessage("Rating cannot be empty")
    .isLength({ max: 1 })
    .withMessage("Rating must have only one number"),
  checkValidations,
];


module.exports = {
  createUsersValidators,
  createMealsValidator,
  createordersValidators,
  createRestaurantsValidators,
  createReviewValidators
};
