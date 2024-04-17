'use strict';

const mysql = require('serverless-mysql')({
  config: {
    host     : 'i4idb1.cqt6f5roexbb.us-east-1.rds.amazonaws.com',
    database : 'i4iben',
    user     : 'i4iben',
    password : 'i4iben'
  }
})

module.exports.delete = async (event, context, callback) => {
  // Create the connection to database
  // const connection = await mysql.createConnection({
  //   host: 'i4idb1.cqt6f5roexbb.us-east-1.rds.amazonaws.com',
  //   user: 'i4iben', 
  //   password: 'i4iben',
  //   database: 'i4iben',
  //   port: '3306',
  //   connectTimeout: 300000
  // });

  var tableName = event.pathParameters.tableName;
  var id = event.pathParameters.id;
  console.log(id);
  // DELETE function
  try {

    let results = await mysql.query(
      'DELETE FROM '+tableName+' WHERE id=' + id
    );

    console.log(results); // results contains rows returned by server

    await mysql.end();

  } catch (err) {
    console.log(err);
  }


  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
};
