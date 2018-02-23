var mysql = require('mysql');
var MySQLPool = require("mysql-pool").MySQLPool;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

var con = mysql.createConnection({
  host: "localhost",
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: "dares"
  //connectionLimit : 10,               // this is the max number of connections before your pool starts waiting for a release
  //multipleStatements : true
  
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



module.exports = con;