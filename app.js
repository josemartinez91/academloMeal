const express = require("express");
const { globalErrorHandle } = require("./controllers/error.controller");
const { mealsRoute } = require("./routes/meals.routes");
const { ordersRoute } = require("./routes/orders.routes");
const { restaurantsRoute } = require("./routes/restaurants.routes");
const { reviewsRoute } = require("./routes/reviews.routes");
const { usersRoute } = require("./routes/users.routes");

const app = express();

app.use(express.json());

// Endpoints
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/meals", mealsRoute);
app.use("/api/v1/reviews", reviewsRoute);
app.use("/api/v1/restaurants", restaurantsRoute);
app.use("/api/v1/orders", ordersRoute);

app.use(globalErrorHandle)


app.all("*", (req, res) => {
  const { method, url } = req;

  res.status(404).json({
    status: "error",
    data: {
      message: `${method} ${url} does not exist on our server`,
    },
  });
});

module.exports = {app}
