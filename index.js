const express = require('express');
const routes = require('./routes/routes'); // A routes.js importálása
const server = express();

server.use(express.json()); // JSON típusú adatok fogadása
server.use('/api', routes); // Az /api útvonalakat a routes.js kezeli

server.listen(3000, () => {
    console.log('A szerver elindult a 3000-es porton...');
});
