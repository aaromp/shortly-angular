var db = require('../config.js');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var UserSchema = new db.Schema({
  username: {type: String, required: true, index: { unique: true}},
  password: {type: String, required: true}
});

UserSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(isMatch);
  });
};

UserSchema.methods.hashPassword = function() {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.get('password'), null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
    });
};

UserSchema.pre('save', function(next) {
  var user = this;

  // only hash password if user is new
  if (!user.isNew) { return next(); }

  user.hashPassword()
  .then(next);
});


module.exports = db.model('User', UserSchema);
