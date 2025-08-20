const mongoose = require('mongoose');

require('../models/User');
require('../models/Food');

async function configDatabase() {
    // TODO set database name
    const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/fast-food';
    await mongoose.connect(connectionString);

    console.log('Database connected successfully');

}

module.exports = { configDatabase };