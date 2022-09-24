const { db } = require("./utils/database.util");
const { app } = require("./app");
const { initModel } = require("./models/initModels.model");
const { catchAsync } = require("./utils/catchAsync.util");

const startServer = catchAsync(async () => {
  await db.authenticate();

  initModel();

  await db.sync();

  const PORT = 4000;

  app.listen(PORT, () => {
    console.log("Express server online");
  });
});

startServer();
