var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('public'));
app.get('/login.html');
app.get('/', function(req, res){ // Need link?
    res.send();
 });


app.post('/login.html', function(req, res) { // Need link also?
    var user_name = req.body.uname;
    var password = req.body.psw;
    console.log(user_name + ' ' + password);
    res.send();
});
var port = process.env.PORT || 8080;



// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);