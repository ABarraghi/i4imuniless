'use strict';

var mysql = require('mysql2/promise');

module.exports.get = async (event, context, callback) => {
  // Create the connection to database
  const connection = await mysql.createConnection({
    host: 'i4idb1.cqt6f5roexbb.us-east-1.rds.amazonaws.com',
    user: 'i4iben', 
    password: 'i4iben',
    database: 'i4iben',
    port: '3306',
    connectTimeout: 300000
  });
  var queryVar = event.pathParameters.queryVar;
  var value = event.pathParameters.value;
  // A simple SELECT query
    //can use id number 98 to test - should return Tim Bush
  try {
    const [results, fields] = await connection.query(
      'SELECT * FROM acc_account WHERE ' + queryVar + '=' + value
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