const pg = require('pg');
const connectionString = 'postgres://localhost:5432/related';

const client = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "related",
    password: "applesauce1",
    port: 5432
});
client.connect();


//Create 
const  addItem = (newItem, callback) => {
    console.log('here is req.body: ', newItem);
    client.query('INSERT INTO products(uuid, name, price, category, images) values($1, $2, $3, $4, $5)', [newItem.uuid, newItem.name, newItem.price, newItem.category, newItem.images], (err, res) => {
        if(err) {
            throw err;
            callback(err, null);
        } else {
            callback(null, res.rows);
        }
    })
  }


//Read
const  getRelatedItemsByUuid = (uuid, callback) => {
  client.query('SELECT * FROM products WHERE category IN (SELECT category FROM products WHERE uuid = $1) LIMIT 20;', [uuid], (err, cats) => {
      if(err) {
          throw err;
          callback(err, null);
      } else {
          callback(null, cats.rows);
      }
  })
}


//Update
const updateRelatedItemByUuid = (updatedInfo, callback) => {
    client.query('UPDATE products SET name=($2), price=($3), category=($4), images=($5) WHERE uuid=($1)', [updatedInfo.uuid, updatedInfo.name, updatedInfo.price, updatedInfo.category, updatedInfo.images], (err, res) => {
        if(err) {
            throw err;
            callback(err, null);
        } else {
            callback(null, res);
        }
    })
}



//Delete
const deleteRelatedItemByUuid = (toDelete, callback) => {
    client.query('DELETE FROM products WHERE uuid=($1)', [toDelete.uuid], (err, res) => {
        if(err) {
            throw err;
            callback(err, null);
        } else {
            callback(null, res);
        }
    })
}


module.exports = {
    getRelatedItemsByUuid,
    addItem,
    updateRelatedItemByUuid,
    deleteRelatedItemByUuid
}