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

  // CREATE function
  try {
    const [results, fields] = await connection.query(
      "INSERT INTO acc_account (serviceaddress_id, suffix, name, createddate, modifieddate, namesearch, namesort) VALUES (108, 0, 'Test Record', "+today+", "+today+", 'Test Record', 'Test Record')"
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
