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
const { getRelatedItemsByUuid, addItem, updateRelatedItemByUuid, deleteRelatedItemByUuid } = require('../db/postgres_index.js');

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

app.post('/items', (req, res) => {
    addItem(req.body, (err, items) => {
        if (err) {
            console.log('Error getting random items:');
            res.status(401).send(err);
        } else {
            console.log('Success! Posted item.');
            res.status(201).send(items);
        }
    });
});


app.put('/items', (req, res) => {
    updateRelatedItemByUuid(req.body, (err, items) => {
        if(err) {
            console.log('Error editing uuid: ', req.body.uuid);
            res.status(401).send(err);
        } else {
            console.log('Success!  You edited uuid: ', req.body.uuid);
            res.status(201).send(items.body);
        }
    })
})

app.delete('/items', (req, res) => {
    deleteRelatedItemByUuid(req.body, (err, items) => {
        if(err) {
            console.log('Error deleting uuid: ', req.body.uuid);
            res.status(401).send(err);
        } else {
            console.log('Success!  You deleted uuid: ', items.body);
        }
    })
})

