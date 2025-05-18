var path = require("path");
var mysql = require("mysql2");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") }); // בדיקת טעינת המשתנים הסביבתיים

// console.log(process.env.DB_USER,process.env.DB_PASS);

var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "Ofakim123",
    database: "social_db"
  });
  
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected successfuly");
  });
  
  module.exports = connection;
  