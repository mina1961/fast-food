const express = require('express');
const router = express.Router();
const userServices = require('../services/userServices');

// GET register page
router.get('/register', (req, res) => {
    res.render('register');
});

// POST register
router.post('/register', async (req, res) => {
    const { email, password, repeatPassword, name } = req.body;
    const errors = [];

    if (!email) errors.push('Email is required');
    if (!password) errors.push('Password is required');
    if (password !== repeatPassword) errors.push('Passwords do not match');
    if (!name) errors.push('Name is required');

    if (errors.length > 0) {
        return res.render('register', { errors, email, name });
    }

    try {
        await userServices.register(email, password);
        res.redirect('/login');
    } catch (err) {
        errors.push(err.message);
        res.render('register', { errors, email, name });
    }
});

module.exports = router;
