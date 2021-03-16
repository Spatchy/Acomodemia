const fs = require('fs');
const credentials = JSON.parse(fs.readFileSync(__dirname + '/credentials.json'));

// lib/db.js
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: credentials.host,
  user: credentials.user,
  database: credentials.db,
  password: credentials.password,
  multipleStatements: true,
  charset: 'utf8mb4',
});
connection.connect();
module.exports = connection;
