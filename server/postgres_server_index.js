const express = require('express');
const router = express.Router();
const path = require('path');

/*
Stuff above this note is from http://www.sammydallalportfolio.com/blogs/postgresql-and-nodejs
I'm using this site to properly setup my server.
*/

const bodyParcer = require('body-parser');
const cors = require('cors');
const PORT = 3005;
const { getRelatedItemsByUuid } = require('../db/postgres_index.js');

const app = express();

app.use(bodyParcer.json());
app.use(cors());
app.use(express.static('public'));

app.listen(PORT, console.log(`Listening on port... ${PORT}`));

app.get('/items/id/:uuid', (req, res) => {
    console.log('GET request at /items/uuid: ' + req.params.uuid);
    getRelatedItemsByUuid(parseInt(req.params.uuid), (err, item) => {
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

// db.inventory.insertMany([
//    { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
//    { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "A" },
//    { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
//    { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
//    { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" }
// ]);


