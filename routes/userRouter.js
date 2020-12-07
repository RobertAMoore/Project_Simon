//Author: Bob Moore

var express = require('express');
var router = express.Router();
//var userModel = require('../models/dbmodel');
//var service = require('../services/services');
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
	res.send('NOT IMPLEMENTED: user create POST');
});

//GET request for login page
router.get('/user/login', function(req, res){
	res.sendFile(path.join(__dirname, '..', 'public', 'html', 'login.html'));
});

//POST request username and password to sign in
router.post('/user/login', function(req, res){
	//if (service.assertPass(req.body.username, req.body.password))
	res.redirect('/user/game'); //Need to pass username
});

//GET request for game page
router.get('/user/game', function(req, res){
	//res.sendFile(path.join(__dirname, '..', 'public', 'html', 'game.html'));
	res.locals.user=req.body.username; //We can make this dynamic later
	req.session.valid = true;
	res.render('layout');
});

//GET current high score
router.get('/user/:username/highScore', function(req, res){
	res.send('NOT IMPLEMENTED: user score GET');
});

//POST new score /user/:username/new-score
router.post('/user/newScore', function(req, res){
	console.log(req.body.score);
	res.send(`NOT IMPLEMENTED: user score POST`);
});

module.exports = router;
