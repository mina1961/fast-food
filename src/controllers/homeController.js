const dataService = require('../services/dataService');

const { Router } = require("express");
const { Food } = require('../models/Food');
const { login } = require("../services/userService");
const { createToken } = require("../services/jwt");

// TODO replace with real router according to your app structure
const homeRouter = Router();


homeRouter.get('/', async (req, res) => {
    const icons = [
        'fa-seedling change',
        'fa-cookie',
        'fa-fish-fins',
        'fa-ice-cream',
        'fa-apple-whole',
        'fa-drumstick-bite',
        'fa-hotdog',
        'fa-cheese',
        'fa-stroopwafel',
        'fa-egg'
    ];
    try {
        const foods = await dataService.getAllData();
        res.render('home', { icons, foods, user: req.user });
    } catch (err) {
        res.status(500).send('Error loading foods');
    }
});

homeRouter.get('/meals', (req, res) => {
    res.render('meals');
});

module.exports = { homeRouter }