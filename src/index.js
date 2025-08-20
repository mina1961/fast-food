const express = require('express');

start();
async function start() {
    const app = express();

    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
}

