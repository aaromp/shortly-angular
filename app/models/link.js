var db = require('../config.js');
var crypto = require('crypto');

var LinkSchema = new db.Schema({
  url: {type: String, required: true },
  base_url: {type: String},
  code: {type: String},
  title: {type: String},
  visits: {type: Number, default: 0}
});

LinkSchema.pre('save', function(next) {
  var link = this;
  var shasum = crypto.createHash('sha1');
  shasum.update(link.get('url'));
  link.set('code', shasum.digest('hex').slice(0,5));
  next();
});

module.exports = db.model('Link', LinkSchema);
