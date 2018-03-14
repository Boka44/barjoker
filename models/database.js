var mysql = require('mysql');
var MySQLPool = require("mysql-pool").MySQLPool;
const DATABASE_USER_PROD = process.env.DATABASE_USER_PROD;
const DATABASE_PASSWORD_PROD = process.env.DATABASE_PASSWORD_PROD;
const DATABASE_USER_DEV = process.env.DATABASE_USER_DEV;
const DATABASE_PASSWORD_DEV = process.env.DATABASE_PASSWORD_DEV;
const DATABASE_HOST_PROD =process.env.DATABASE_HOST_PROD;

// var con = mysql.createConnection({
//   host: "localhost",
//   user: DATABASE_USE_DEV,
//   password: DATABASE_PASSWORD_DEV,
//   database: "dares"
//   //connectionLimit : 10,               // this is the max number of connections before your pool starts waiting for a release
//   //multipleStatements : true
  
// });

var con = mysql.createConnection({
  host: DATABASE_HOST_PROD,
  user: DATABASE_USER_PROD,
  password: DATABASE_PASSWORD_PROD,
  database: "barjoker"
  //connectionLimit : 10,               // this is the max number of connections before your pool starts waiting for a release
  //multipleStatements : true
  
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



module.exports = con;