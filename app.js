//Author: Rick Roberts
var mongoose = require('mongoose');
var express = require('express');
var router = require('./routes/userRouter');
var path = require('path');
var session = require('express-session');
var app = express();

var port = process.env.PORT || 8080;


app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(session({cookie: { path: '/', httpOnly: false, maxAge: 24*60*60*1000},
                 secret: 'secret', 
                 saveUninitialized: false, 
                 resave: false}));
app.use('/', router);

app.set('view engine', 'pug')
app.set('views', './views')

app.listen(port,async()=>{
  try{  
    await mongoose.connect('mongodb://localhost:27017/simonDB', {useUnifiedTopology: true, 
                                                                useNewUrlParser: true, 
                                                                useFindAndModify: false})
    console.log('Database Connected');
  }
  catch(error){console.log(error.message)}
});

console.log('Server started! At http://localhost:' + port)
