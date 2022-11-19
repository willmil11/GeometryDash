let http = require("http");
let fs = require("fs");

console.info("[LocalServer] Running...");

http.createServer(function (req, res) {
    console.info("[Request] Requested url: '" + req.url + "'");
    if (req.url === "/" || ((req.url).slice(0, -("1668855878756").length)) === "/?vscodeBrowserReqId="){
        try{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(fs.readFileSync((__dirname + "/index.html")));
        }
        catch (error){
            res.writeHead(404);
            res.end(("An error has occured:<br><br>" + error))
        }
    }
    else{
        try{
            if ((req.url).slice(((req.url).length - 2)) === "js"){
                res.writeHead(200, {'Content-Type': 'text/javascript'});
                res.end(fs.readFileSync((__dirname + req.url)));
            }
            else{
                res.writeHead(200);
                res.end(fs.readFileSync((__dirname + req.url)));
            }
        }
        catch (error){
            res.writeHead(404);
            res.end(("An error has occured:<br><br>" + error))
        }
    }
}).listen(1234);