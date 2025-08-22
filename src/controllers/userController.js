const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { isGuest } = require('../middlewares/guards');
const { register, login } = require('../services/userService');
const { createToken } = require('../services/jwt');
const { parseError } = require('../util');

const userRouter = Router();

// GET register page
userRouter.get('/register', isGuest(), (req, res) => {
    res.render('register', { layout: 'main', title: 'Register Page' });
});

// POST register
userRouter.post('/register',
    isGuest(),
    body('name')
        .isLength({ min: 2, max: 20 })
        .withMessage('Name should be between 2 and 20 characters!'),
    body('email')
        .isLength({ min: 10 })
        .withMessage('Email should be at least 10 characters!'),
    body('password')
        .isLength({ min: 4 })
        .withMessage('Password must be at least 4 characters!'),
    body('rePassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match!');
        }
        return true;
    }),
    async (req, res) => {
        const { name, email, password } = req.body;
        const errors = validationResult(req);
        let errorMessages = [];
        if (!errors.isEmpty()) {
            errorMessages = errors.array().map(e => e.msg);
        }
        try {
            if (errorMessages.length > 0) {
                throw new Error(errorMessages.join('\n'));
            }
            // Register user
            const user = await register(name, email, password);
            // Create JWT and set cookie
            const token = createToken(user);
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/meals');
        } catch (err) {
            // Keep entered data except passwords
            res.render('register', {
                layout: 'main',
                title: 'Register Page',
                errors: err.message.split('\n'),
                name,
                email
            });
        }
    }
);

// GET login page
userRouter.get('/login', isGuest(), (req, res) => {
    res.render('login', { layout: 'main', title: 'Login Page' });
});

// POST login
userRouter.post('/login',
    isGuest(),
    body('email').trim(),
    body('password').trim(),
    async (req, res) => {
        const { email, password } = req.body;
        const errors = validationResult(req);
        let errorMessages = [];
        if (!errors.isEmpty()) {
            errorMessages = errors.array().map(e => e.msg);
        }
        try {
            if (errorMessages.length > 0) {
                throw new Error(errorMessages.join('\n'));
            }
            const user = await login(email, password);
            const token = createToken(user);
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/meals');
        } catch (err) {
            res.render('login', {
                layout: 'main',
                title: 'Login Page',
                errors: err.message.split('\n'),
                email
            });
        }
    }
);

userRouter.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});


module.exports = { userRouter };
