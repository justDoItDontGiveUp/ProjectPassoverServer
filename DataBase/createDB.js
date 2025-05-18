var mysql = require("mysql2");
var path = require("path");

function createDB() {

    var connection = mysql.createConnection({
      host: "localhost",
      user:"root",
      password:"Ofakim123"
    });
    connection.query(`CREATE DATABASE social_db`, function (err, result) {
        if (err) throw err;
        console.log(`social_db created`);
      });
  }
  createDB();
  module.exports = createDB;