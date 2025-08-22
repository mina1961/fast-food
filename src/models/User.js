const { Schema, model } = require('mongoose');

// TODO replace with actual user model

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

const User = model('User', userSchema);

module.exports = { User };
