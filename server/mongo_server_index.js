
const express = require('express');
const bodyParcer = require('body-parser');
const cors = require('cors');
const PORT = 3005;
const db = require('../db/mongo_index.js');
const app = express();

app.use(bodyParcer.json());
app.use(cors());
app.use(express.static('public'));

app.listen(PORT, () => {console.log(`Listening on port... ${PORT}`)});

app.get('/items/id/:uuid', (req, res) => {
    console.log('GET request at /items/uuid: ' + req.params.uuid);
    db.getRelatedItemByUuid(parseInt(req.params.uuid), (err, item) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            console.log('Success!  Here is what database returned: ', item);
            res.status(201).send(item);
        }
    });
});


app.get('/items/category/:category', (req, res) => {
    console.log('GET request at /items/cetegory: ', req.params.category);
    db.getItemsByCategory(req.params.category, (err, items) => {
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
    db.getRandomItems((err, items) => {
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


app.post('/items/name/:name/price/:price/category/:category/images/:images', (req, res) => { 
  db.insertRelatedItem(req.params.name, req.params.price, req.params.category, req.params.images, (err) => {
      console.log('here is req.body: ', req.body);
      if(err) {
          res.status(401).send(err);
      } else {
          res.status(201);
      }
  });  
})


//Delete
app.delete('items/id/:uuid', (req, res) => {
  db.deleteRelatedItem(req.params.uuid, (err) => {
    console.log('here is req.params.uuid: ', req.params.uuid);
      if(err) {
          res.status(401).send(err);
      } else {
          res.status(201);
      }
  })
})


//Put
app.put('items/update', (req, res) => {
    db.updateRelatedItem(req.body, (err) => {
        console.log('here is req.body: ', req.body);
        if(err) {
            res.status(401).send(err);
        } else {
            res.status(201);
        }
    })
})



