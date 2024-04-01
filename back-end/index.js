var mysql = require('mysql2/promise');

// Lambda handler function
exports.handler = async (event) => {

// Create the connection to database
const connection = await mysql.createConnection({
  host: 'i4idb1.cqt6f5roexbb.us-east-1.rds.amazonaws.com',
  user: 'i4iben', 
  password: 'i4iben',
  database: 'i4iben',
  port: '3306',
  connectTimeout: 300000
});


// A simple SELECT query
try {
  const [results, fields] = await connection.query(
    'SELECT * FROM acc_account'
  );


  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra meta data about results, if available
} catch (err) {
  console.log(err);
}


  return {
    statusCode: 200 
  };


};