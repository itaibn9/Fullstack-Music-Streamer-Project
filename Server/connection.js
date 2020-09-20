const express = require('express');
var mysql = require('mysql');
const app = express();
require('dotenv').config();

app.use(express.json());

let mysqlCon = mysql.createConnection({
    host: "localhost",
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
  });

  mysqlCon.connect(err => {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = mysqlCon;