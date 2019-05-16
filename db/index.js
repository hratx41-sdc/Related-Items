const mysql = require('mysql');

const conn = mysql.createConnection({
    user:'root',
    password: '',
    database: 'relatedObjects'
});

conn.connect((err) => {
    if (err) {
        console.log('Error connecting to RelatedObjectsDB:', err.sqlMessage, err.message, err.code)
    } else {
        console.log('Successfully connected to RelatedObjectsDB!');
    }
})


module.exports = {
}