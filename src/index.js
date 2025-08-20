const express = require('express');
const { configDatabase } = require('./config/configDatabase');
const { configExpress } = require('./config/configExpress');
const { configHbs } = require('./config/configHbs');
const { configRoutes } = require('./config/configRoutes');
require('dotenv').config();

start();
async function start() {
    const app = express();

    await configDatabase(app);
    configExpress(app);
    configHbs(app);
    configRoutes(app);

    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
}

