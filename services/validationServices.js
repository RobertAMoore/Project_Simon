//Author:Rick Roberts

var userModel = require('../models/userQueries');

// Checks if score is higher than in DB
// Returns true if it is.
exports.isHighScore = async function (username, score) {
    let highscore = await userModel.getHighScore(username);
    if (score > highscore) 
        return true;
    else
        return false;
};

// Checks to see if the user is in the DB
// If they are, returns true.
//This needs a case for if the user isn'y found 
exports.userExists = async function (username){
    let user = await userModel.getUser(username);
    if(username == user.id)
        return true;
    else
        return false;
};

//Returns true if username and password pair match 
//This needs a case for if username or password aren't found
exports.login = async function (username, password) {
    let user = await userModel.getUser(username);
    if((username == user._id) && (password == user.password))
        return true;
    else 
        return false;
};


