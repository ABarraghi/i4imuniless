'use strict';

// var mysql = require('mysql2/promise');

const mysql = require('serverless-mysql')({
  config: {
    host     : 'i4idb1.cqt6f5roexbb.us-east-1.rds.amazonaws.com',
    database : 'i4iben',
    user     : 'i4iben',
    password : 'i4iben'
  }
})

module.exports.list = async (event) => {
  // Create the connection to database
  // const connection = await mysql.createConnection({
  //   host: 'i4idb1.cqt6f5roexbb.us-east-1.rds.amazonaws.com',
  //   user: 'i4iben', 
  //   password: 'i4iben',
  //   database: 'i4iben',
  //   port: '3306',
  //   connectTimeout: 5000
  // });

  // A simple SELECT query
  var tableName = event.pathParameters.tableName;
  try {

    let results = await mysql.query(
      'SELECT * FROM '+tableName
    );

    console.log(results); // results contains rows returned by server

    await mysql.end();

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
