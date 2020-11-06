var MongoClient= require('mongodb').MongoClient,
    Server = require('mongodb');

var client= new MongoClient();
client.connect('mongodb://localhost: 8080'),
    {poolSize: 5, reconnectInterval: 500,},

function(err, db) {
    if(err){
        console.log("Conncection Failed Via Client Object.");

    }else {
        var db= db.db("simonDB");

    }
    db.close();
        console.log("Connection closed....");
                


};
        
    
    
