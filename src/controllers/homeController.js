const { Router } = require("express");
const { login } = require("../services/userServices");
const { createToken } = require("../services/jwt");

// TODO replace with real router according to your app structure
const homeRouter = Router();

homeRouter.get('/', async (req, res) => {
    console.log(req.user);

    // This code creates a token and saves it in a cookie
    //const result = await login('John', '123456');
    //const token = createToken(result);
    //res.cookie('token', token, { httpOnly: true });

    res.render('home');
})

module.exports = { homeRouter }