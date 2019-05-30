const express = require('express');
const bodyParcer = require('body-parser');
const cors = require('cors');
const PORT = 3005;
const { getItemByUuid, getItemsByCategory, getRandomItems } = require('../db/index.js');

const app = express();

app.use(bodyParcer.json());
app.use(cors());
app.use(express.static('public'));

app.listen(PORT, console.log(`Listening on port... ${PORT}`));

app.get('/items/id/:uuid', (req, res) => {
    console.log('GET request at /items/uuid: ' + req.params.uuid);
    getItemByUuid(req.params.uuid, (err, item) => {
        if (err) {
            console.log(err);
            res.status(401).send(err);
        } else {
            console.log('Success! Found result for uuid: ' + req.params.uuid);
            res.status(201).send(item);
        }
    });
});

app.get('/items/category/:category', (req, res) => {
    console.log('GET request at /items/cetegory: ', req.params.category);
    getItemsByCategory(req.params.category, (err, items) => {
        if (err) {
            console.log(`Error finding items w/ category ${req.params.category}:`);
            console.log(err);
            res.status(401).send(err);
        } else {
            console.log(`Success! Found ${items.length} results for ${req.params.category}.`);
            res.status(201).send(items);
        }
    });
});

app.get('/items/random', (req, res) => {
    console.log('GET request for 20 random items.');
    getRandomItems((err, items) => {
        if (err) {
            console.log('Error getting random items:');
            console.log(err);
            res.status(401).send(err);
        } else {
            console.log('Success! Got 20 random items.');
            res.status(201).send(items);
        }
    });
});


