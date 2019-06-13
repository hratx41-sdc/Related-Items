const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/products', {useNewUrlParser: true});



//establish database connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('we are connected to Mongo database!');
});

//the main object
let relatedItemsSchema = mongoose.Schema({
  'UUID': Number,
  'name': String,
  'price': String,
  'category': String,
  'images': String
});

let Product = mongoose.model('Product', relatedItemsSchema, 'products');

const getRelatedItemByUuid = (uuid, callback) => {
  console.log('here is uuid: ', uuid);
  Product.find({'UUID': uuid}, (err, result) => {
    if(err) {
      console.log(err);
      throw err;
    } else {
      console.log('Holy cow!  Your database is sending something to your server! ', result);
      callback(null, result);
    }
  })
};

const getItemsByCategory = function(category, cb) {
  Product.find({ category: category }, (err, items) => {
        if (err){
            cb(err, null);
        } else {
            cb(null, items);
        }
    });
};


const getRandomItems = function(cb) {
  Product.find({}, (err, items) => {
      if (err){
          cb(err, null);
      } else {
          const randomItems = [];
          for(let i = 0; i < 20; i ++){
              let x = Math.floor(Math.random() * (100 - i));
              randomItems.push(items.splice(x, 1)[0]);
          }
          cb(null, randomItems);
      }

  });
}


const insertRelatedItem = (theUuid, theName, thePrice, theImages) => {
  Product.insert({ uuid: theUuid, product_name: theName, price: thePrice, images: theImages }, (err) => {
        if(err) {
            console.log('There was an error: ', err);
            throw err;
        } else {
            console.log('You successfully inserted something into your MongoDB.')
        }
    });
}


const deleteRelatedItem = (theUuid) => {
  Product.deleteOne({uuid: theUuid}, (err) => {
    if(err) {
      console.log('There was an error: ', err);
    } else {
      console.log('You successfully deleted something from your MongoDB');
    }
  })
}

//update
const updateRelatedItem = (theUuid, theName, thePrice, theImages) => {
  Product.updateOne({uuid: theUuid}, {uuid: theUuid, product_name: theName, price: thePrice, images: theImages}, (err) => {
    if(err) {
      console.log('There was an error in your update: ', err);
    } else {
      console.log('You successfully updated your MongoDB.');
    }
  })
}


module.exports = {
  db, 
  getRelatedItemByUuid, 
  insertRelatedItem, 
  deleteRelatedItem,
  updateRelatedItem,
  getItemsByCategory,
  getRandomItems
  }