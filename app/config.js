var mongoose = require('mongoose');

var dbHostName = process.env.DB_HOST || 'localhost/shortly';
var db = mongoose.connect(dbHostName);

module.exports = db;
