'use strict';

const mysql = require('serverless-mysql')({
  config: {
    host     : 'i4idb1.cqt6f5roexbb.us-east-1.rds.amazonaws.com',
    database : 'i4iben',
    user     : 'i4iben',
    password : 'i4iben'
  }
})

module.exports.create = async (event, context, callback) => {
  const today = new Date().getDate();
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

  var tableName = event.pathParameters.tableName;
  var insertFields = eventBody.insertFields;
  var insertValues = eventBody.insertValues;
  // CREATE function
  //can test with:
  //{
  //"body":{"tableName":"acc_account","insertFields":"serviceaddress_id, suffix, name, namesearch, namesort","insertValues":"108, 0, 'Test Record', 'Test Record', 'Test Record'"}
  //}
  try {
    let results = await mysql.query(
      "INSERT INTO "+tableName+" (createddate, modifieddate, "+insertFields+") VALUES ("+today+", "+today+", "+insertValues+")"
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
