const mysql = require('mysql');
const config = require('./config');
const db = mysql.createConnection(config.db);
db.connect(function(err){if(err){throw err;}});
module.exports = db;
