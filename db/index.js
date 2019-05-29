const mongoose = require('mongoose');
const { Schema } = mongoose;
const { itemsArray } = require('../items');
const uri = require('./asdf.js');


mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`We're connected to MongoDB!`));


//build our item schema w/ methods
const itemSchema = new Schema({
    uuid: Number,
    name: String,
    price: Number,
    details: [String],
    images: [String],
    category: String,
    sizing: String
});

const Item = mongoose.model('Item', itemSchema);

const getItemByUuid = function(uuid, cb) {
    Item.find({ uuid: uuid }, (err, item) => {
        if (err){
            cb(err, null);
        } else {
            cb(null, item);
        }
    });
};

const getItemsByCategory = function(category, cb) {
    Item.find({ category: category }, (err, items) => {
        if (err){
            cb(err, null);
        } else {
            cb(null, items);
        }
    });
};

const getRandomItems = function(cb) {
    Item.find({}, (err, items) => {
        if (err){
            cb(err, null);
        } else {
            const randomItems = [];
            for(let i = 0; i < 21; i ++){
                let x = Math.floor(Math.random() * (100 - i));
                randomItems.push(items.splice(x, 1)[0]);
            }
            cb(null, randomItems);
        }

    });
}




//THESE ARE FOR DE-SEEDING AND RE-SEEDING DB AS NEEDED DO NOT DELETE

// Item.deleteMany({}, (err) => console.log);

// Item.create(itemsArray, (err, itemInstances) => {
//     if (err) {
//         console.log('Error seeding Items Database:');
//         console.log(err);
//     } else {
//         console.log('Successfully seeded Items Database!');
//     }
// }); 


module.exports = {
    getItemByUuid,
    getItemsByCategory,
    getRandomItems
}