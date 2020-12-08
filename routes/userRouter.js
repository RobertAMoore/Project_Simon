//Author: Bob Moore

var express = require('express');
var router = express.Router();
var userModel = require('../models/userQueries');
var validate = require('../services/validationServices');
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
	res.sendFile(path.join(__dirname, '..', 'public', 'html', 'signUp.html'));
});

//POST request to create new user
router.post('/user/create', function(req, res){
	if (validate.userExists(req.body.username)){
		res.send('User already exists');
	}
	else{
		userModel.createUser(req.body.username, req.body.password);
		res.redirect('/user/login');
	}
});

//GET request for login page
router.get('/user/login', function(req, res){
	res.sendFile(path.join(__dirname, '..', 'public', 'html', 'login.html'));
});

//POST send username and password to sign in
router.post('/user/login', function(req, res){
	if (validate.login(req.body.username, req.body.password)){
		//Create session
		//req.session.valid = true;
		//req.session.user = trusted;
		res.redirect('/user/game');
	}
	else 
		res.send('Password Incorrect or User does not exist');
});

//GET request for game page
router.get('/user/game', function(req, res){
	res.locals.user = req.body.username; //This will need session variable username
	res.render('layout');
});

//GET current high score
router.get('/user/highScore', function(req, res){
	res.send('NOT IMPLEMENTED: user score GET');
});

//POST new score /user/new-score
//req.body.username is going to have to change to a session variable here
router.post('/user/newScore', async function(req, res){
	let username = req.body.username;
	let score = parseInt(req.body.score);
	let highscore = await userModel.getHighScore(username);
	
	if(score > highscore){
		userModel.setHighScore(username, score);
		//Notify user of new highscore
	}
});

//GET top five users 
router.get('/topFiveScores', function(req, res){
	res.send('NOT IMPLEMENTED: user score GET');
});

//Use this URL to test database
router.get('/test', async function(req, res, next){
	let highscore = await userModel.getHighScore("bob"); //This needs a way to catch errors 
	console.log(highscore);
});

module.exports = router;
