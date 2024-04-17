'use strict';

var mysql = require('mysql2/promise');

module.exports.update = async (event) => {
  // Create the connection to database
  const connection = await mysql.createConnection({
    host: 'i4idb1.cqt6f5roexbb.us-east-1.rds.amazonaws.com',
    user: 'i4iben', 
    password: 'i4iben',
    database: 'i4iben',
    port: '3306',
    connectTimeout: 5000
  });

  var eventBody = JSON.parse(event.body); //Could change in axios

  console.log(eventBody);

  // UPDATE function
  var tableName = event.pathParameters.tableName;
  var id = event.pathParameters.id;
  var updateColumn = eventBody.updateColumn;
  var updateValue = eventBody.updateValue;
  try {
    const [results, fields] = await connection.query(
      'UPDATE '+tableName+' SET ' + updateColumn + '=' + updateValue + ' WHERE id=' + id
    );
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    }
  };

};
