'use strict';

const mysql = require('serverless-mysql')({
  config: {
    host     : 'i4idb1.cqt6f5roexbb.us-east-1.rds.amazonaws.com',
    database : 'i4iben',
    user     : 'i4iben',
    password : 'i4iben'
  }
})

module.exports.update = async (event) => {
  // Create the connection to database
  // const connection = await mysql.createConnection({
  //   host: 'i4idb1.cqt6f5roexbb.us-east-1.rds.amazonaws.com',
  //   user: 'i4iben', 
  //   password: 'i4iben',
  //   database: 'i4iben',
  //   port: '3306',
  //   connectTimeout: 5000
  // });

  var eventBody = JSON.parse(event.body); //Could change in axios

  console.log(eventBody);

  // UPDATE function
  var tableName = event.pathParameters.tableName;
  var id = event.pathParameters.id;
  var updateColumn = eventBody.updateColumn;
  var updateValue = eventBody.updateValue;
  try {
    let results = await mysql.query(
      'UPDATE '+tableName+' SET ' + updateColumn + '=' + updateValue + ' WHERE id=' + id
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
    }
  };

};
