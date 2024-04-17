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
    connectTimeout: 500
  });

  var tableName = event.pathParameters.tableName;
  var value = event.pathParameters.id;
  // A simple SELECT query
    //can use id number 98 to test - should return Tim Bush
  try {
    const [results, fields] = await connection.query(
      'SELECT * FROM '+tableName+' WHERE id =' + value
    );
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available

    return {
      body: JSON.stringify(results),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode: 200
    }
  } catch (err) {
    console.log(err);
  }


};
