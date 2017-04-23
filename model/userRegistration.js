var mongoose = require('mongoose');
var schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var User = new schema({
  username:{
    unique:true,
    type:String,
    required:true
  },
  email:{
    unique:true,
    type:String,
    required:true
  },
  password:String,
  //required:true
}, {
    timestamps: true
});
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
