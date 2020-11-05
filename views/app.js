const express = require('express');

const app = express();
app.listen(8080);

app.get('/',(req,res) => {
    res.sendFile('./simon.login.html', {root: __dirname});

});

app.use((req,res) => {
    res.sendFile('/404.html', {root: __dirname});

});
        // This can be used if needed to display simon.html which
        // will be the game interface
//app.get('/simon',(req,res) => {
//    res.sendFile('./simon.html' , {root: __dirname});
//});

