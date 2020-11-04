const http = require ('http');
const fs = require ('fs');
const url = require ('url');
const util = require ('util');


const port = 8080;

const server = http.createServer(function ( req, res) {

    // req.method (login)// Get Post?
    // console.log(req.url) // Returns path if needed
    res.writeHead(200, { 'Content-Type':'text/html' })
    fs.readFile('simon.html', function(error, data){
        if(error){
            res.writeHead(404)
            res.write('File Not Found')
        }else{
            res.write(data)
        }
        
        
        res.end()
    })    

})

server.listen(port, function(error) {

    if(error){
        console.log('Server did not connect', error)           
    }else{
        console.log('Server is listening => Port: '+ port)
    }
})