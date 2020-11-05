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

    }if(db){ 
        console.log("Connected Via Client Object....");
        db.authenticate("dbadmin", "test", function(err, results){
                if(err){
                    console.log("Authentication failed...");
                    db.close();
                    console.log("Connection closed.....");
                }else{
                    console.log("Authenticated Via Client Object..");
                    db.logout(function (err, result){
                        if(!err){
                            console.log("Loogged out Via Client Object");
                        }
                        db.close();
                        console.log("Connection closed....");
                });

            }

        });
        
    }
    
}