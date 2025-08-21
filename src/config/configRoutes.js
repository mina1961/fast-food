
const { homeRouter } = require("../controllers/homeController");
const userController = require("../controllers/userController");

function configRoutes(app) {
    app.use(homeRouter)
    app.use(userController);
}

module.exports = { configRoutes };