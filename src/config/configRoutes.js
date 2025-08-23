
const { homeRouter } = require("../controllers/homeController");
const { userRouter } = require("../controllers/userController");
const { foodRouter } = require("../controllers/foodController");

function configRoutes(app) {
    app.use(homeRouter);
    app.use(userRouter);
    app.use(foodRouter);
}

module.exports = { configRoutes };