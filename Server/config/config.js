require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.USER,
    "password": process.env.PASSWORD,
    "database": process.env.DEVDATABASE,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.USER,
    "password": process.env.PASSWORD,
    "database": process.env.TESTDATABASE,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.USER,
    "password": process.env.PASSWORD,
    "database": process.env.PRODDATABASE,
    "host": "esilxl0nthgloe1y.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
    "dialect": "mysql"
  }
}
