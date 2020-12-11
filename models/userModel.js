//Author: Bob Moore

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
const UserSchema = new mongoose.Schema(
  {
    _id: {
	type: String,
    },
    
    password: {
	type: String,
	required: true,
    },
    
    highscore: {
	type: Number,
	required: true,
	defualt: 0,
    }
  },
  {
      timestamps: true
  });

//Third parameter is collection name
const Users = mongoose.model('User', UserSchema, 'users');
 
module.exports = Users;
