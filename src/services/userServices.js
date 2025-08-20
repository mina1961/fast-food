const { User } = require('../models/User');
const bcrypt = require('bcrypt');

//TODO set identity prop name based on exam description
const identityPropName = 'email';

async function register(identity, password) {
    const existingUser = await User.findOne({ [identityPropName]: identity });

    if (existingUser) {
        throw new Error(`User with ${identityPropName} ${identity} already exists`);
    }

    const user = new User({
        [identityPropName]: identity,
        password: await bcrypt.hash(password, 10)
    })

    await user.save();

    return user;
}

async function login(identity, password) {
    const user = await User.findOne({ [identityPropName]: identity });

    if (!user) {
        throw new Error(`User with ${identityPropName} ${identity} not found`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    return user;
}

module.exports = {
    register,
    login
};