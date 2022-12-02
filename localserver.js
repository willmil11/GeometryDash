//Create a localserver to serve the files in the current directory with the http module

var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    //If requested file is index.html
    if (req.url === '/') {
        //Read the file
        var file = fs.readFileSync((__dirname + "/index.html"));
        //Html writehead
        res.writeHead(200, { 'Content-Type': 'text/html' });
        //Write the file
        res.end(file);
    }
    //If the requested file ends with .js (check with slice method)
    else{
        //Throw the code below in a try catch
        try{
            if (req.url.slice(-3) === '.js') {
                //Read the file
                var file = fs.readFileSync((__dirname + req.url));
                //Js writehead
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                //Write the file
                res.end(file);
            }
            else{
                //Read the file
                var file = fs.readFileSync((__dirname + req.url));
                //Html writehead    
                res.writeHead(200, { 'Content-Type': 'text/html' });
                //Write the file
                res.end(file);
            }
        }
        catch (error){
            //Respond with 404
            res.writeHead(404, { 'Content-Type': 'text/html' });
            //Write the file
            res.end("404 Not Found");
        }
    }
}).listen(1234);