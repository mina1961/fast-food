const { Router } = require('express');
const { isUser } = require('../middlewares/guards');
const dataService = require('../services/dataService');
const { body, validationResult } = require('express-validator')

const foodRouter = Router();
// GET /foods - връща всички храни (пример: за API или за тест)
foodRouter.get('/foods', async (req, res) => {
    try {
        const foods = await dataService.getAllData();
        res.json(foods); // Ако искаш да рендерираш страница, замени с res.render('foods', { foods });
    } catch (err) {
        res.status(500).json({ error: 'Error loading foods' });
    }
});

foodRouter.post('/foods', async (req, res) => {
    try {
        const food = await dataService.create(req.body, req.body.author || null); // author може да е userId
        res.status(201).json(food);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});



// Route за бургери
foodRouter.get('/meals/burgers', async (req, res) => {
    try {
        const foods = await dataService.getAllData();
        const burgers = foods.filter(f => f.category === 'burger');
        res.render('meals', { foods: burgers, category: 'burger', user: req.user });
    } catch (err) {
        res.status(500).send('Error loading burgers');
    }
});

// Route за пици
foodRouter.get('/meals/pizzas', async (req, res) => {
    try {
        const foods = await dataService.getAllData();
        const pizzas = foods.filter(f => f.category === 'pizza');
        res.render('meals', { foods: pizzas, category: 'pizza', user: req.user });
    } catch (err) {
        res.status(500).send('Error loading pizzas');
    }
});

module.exports = { foodRouter };