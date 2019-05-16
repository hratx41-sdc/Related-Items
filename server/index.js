const express = require('express');
const bodyParcer = require('body-parser');
const PORT = 3005;
const db = require('../db/index.js');

const app = express();

app.use(bodyParcer.json());
app.use(express.static('public'));

app.listen(PORT, console.log(`Listening on port... ${PORT}`));



