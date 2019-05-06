var server = require('http');

function onRequest(request, response){
    console.log("A user made a request" + request.url);
    response.writeHead(200, {"Context-Type": "text/plain"});
    response.write("Here is your response");
    response.end();
}

server.createServer(onRequest).listen(3000);
console.log("Server is now running");
