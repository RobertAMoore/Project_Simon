//Author: Sean Barrett
var mongoose = require('mongoose');
var Users = require('./userModel');


exports.createUser = function (username,password){
	const newUser = new Users({_id: username, password: password, highscore: 0});
	newUser.save(function (err, newUser){
		if (err) 
			return console.error(err);
		else
			console.log("New user " + newUser._id + " created");
	});			
} 

exports.getUser = async function (username){
	try{
		let user = await Users.findById(username);
		return user;
	}catch(err){
		return null;
	}
}

exports.setHighScore = function (username, score){
	Users.findByIdAndUpdate(username, {$set:{highscore: score}}, function (err, docs) { 
		if (err){ 
			console.log(err) 
		} 
		else{ 
			console.log("Updated " + docs._id + "'s highscore"); 
		} 
	});
}

//Returns int equal to specified users highscore
exports.getHighScore = async function (username){
	let user = await Users.findById(username, {_id:0, highscore:1});
	return user.highscore;
}

//Returns array of five users with the highest scores. Most recently updated documents get precedence 
exports.topFiveScores = async function (){
	return await Users.find({}, {_id:1, highscore:1}).sort({ highscore: 'desc', updatedAt: 'desc' }).limit(5);
}

exports.getAllUsers = async function (){
	return await Users.find({}, {_id:1, highscore:1}, function(err, result) {
		if (err) {
			console.log(err);
		}
		else {
			console.log(result);
		}
	});
}


