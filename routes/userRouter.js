//Author: Bob Moore

var express = require('express');
var router = express.Router();
var userModel = require('../models/userQueries');
var path = require('path');
var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


//GET redirect to login page uri
router.get('/', function(req, res){
	res.redirect('/user/login');
});

//GET request for signup page
router.get('/user/create', function(req, res){
	if(req.session.valid){
		res.redirect('/user/game');
	}
	else{
		res.sendFile(path.join(__dirname, '..', 'public', 'html', 'signUp.html'));
	}
});

//POST request to create new user
router.post('/user/create', async function(req, res){
	let user = await userModel.getUser(req.body.username);
	
	if (user == null){
		userModel.createUser(req.body.username, req.body.password);
		res.redirect('/user/login');
	}
	else if (req.body.username = user._id){
		res.send('User already exists');
	}
});

//GET request for login page
router.get('/user/login', function(req, res){
	res.sendFile(path.join(__dirname, '..', 'public', 'html', 'login.html'));
});

//POST send username and password to sign in
router.post('/user/login', async function(req, res){
	let username = req.body.username;
	let password = req.body.password;
	let user = await userModel.getUser(username);
	
	if (user == null){
		res.send('User Does Not Exist');
	}
	else if ((username == user._id) && (password != user.password)){
		res.send('Password Incorrect');
	}
	else if ((username == user._id) && (password == user.password)){
		req.session.valid = true;
		req.session.user = username;
		res.redirect('/user/game');
	}
	else{
		res.send("Unknown Error");
	} 
});

//GET request for game page
router.get('/user/game', async function(req, res){
	if (req.session.valid){
		let username = req.session.user;
		let highscore = await userModel.getHighScore(username);
		let leaderboard = await userModel.topFiveScores();
	
		res.render('index', {user: username, highscore: highscore, leaderboard: leaderboard});
	}
	else{
		res.redirect('/');
	}
});

//POST compare new score
router.post('/user/newScore', async function(req, res){
	let score = parseInt(req.body.score);
	let username = req.session.user;
	let highscore = await userModel.getHighScore(username);

	if(score > highscore){
		userModel.setHighScore(username, score);
		res.send(true);
	}
	else{
		res.send(false);
	}
});

//GET end user session 
router.get('/user/logout', function(req, res){
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
