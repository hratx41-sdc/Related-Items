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



//Delete


module.exports = {
    getRelatedItemsByUuid
}