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
	return await Users.findById(username);
}

exports.setHighScore = function (username, score){
	Users.findByIdAndUpdate(username, {$set:{highscore: score}}, function (err, docs) { 
		if (err){ 
			console.log(err) 
		} 
		else{ 
			console.log("Updated highscore"); 
		} 
	});
}

//Returns int equal to specified users highscore
exports.getHighScore = async function (username){
	let user = await Users.findById(username,{_id:0, highscore:1});
	return user.highscore;
}

exports.topFiveScores = async function (){
	return await Users.find({},{_id:1, highscore:1}).sort({ highscore: 'asc' }).limit(5);
}

exports.getAllUsers = async function (){
	return await Users.find({});
}

exports.getAllScores = async function (){
	return await Users.find({},{_id:1, highscore:1});
}


