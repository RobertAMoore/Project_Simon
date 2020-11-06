const express = require('express');


const app = express();
app.listen(8080, () => console.log('Listening on Port =>8080'));


app.get('/',(req,res) => {
    res.sendFile('./simon.login.html', {root: __dirname});

});

app.use((req,res) => {
    res.sendFile('/404.html', {root: __dirname});

});
        



