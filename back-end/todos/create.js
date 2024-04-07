'use strict';

var mysql = require('mysql2/promise');

module.exports.create = async (event, context, callback) => {
  const today = new Date().getDate();
  // Create the connection to database
  const connection = await mysql.createConnection({
    host: 'i4idb1.cqt6f5roexbb.us-east-1.rds.amazonaws.com',
    user: 'i4iben', 
    password: 'i4iben',
    database: 'i4iben',
    port: '3306',
    connectTimeout: 300000
  });

  var tableName = event.pathParameters.tableName;
  var insertFields = event.pathParameters.insertFields;
  var insertValues = event.pathParameters.insertValues;
  // CREATE function
  //can test with:
  //{
  //"pathParameters":{"tableName":"acc_account","insertFields":"serviceaddress_id, suffix, name, namesearch, namesort","insertValues":"108, 0, 'Test Record', 'Test Record', 'Test Record'"}
  //}
  try {
    const [results, fields] = await connection.query(
      "INSERT INTO "+tableName+" (createddate, modifieddate, "+insertFields+") VALUES ("+today+", "+today+", "+insertValues+")"
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
