/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var { Buffer } = require('node:buffer');
let storage = [];
var requestHandler = function (request, response) {
  // const { method, url } = request;
  // var body = [];
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.

  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';
  var storage = [];

  if (request.url === '/classes/messages' && request.method === 'GET') {
    // let body = [];
    // body = JSON.stringify(body);
    storage = JSON.stringify(storage);

    var statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end(storage);
    // });
  } else if (request.url === '/classes/messages' && request.method === 'POST') {
    let body = [];
    request.on('data', (chunk) => {
      console.log(chunk);
      console.log(chunk.toString());
      body.push(chunk);
    }).on('end', () => {
      // body = JSON.stringify(body); //passes test
      // body = Buffer.concat(body).toString(); //option 2: does not pass test
      Buffer.alloc(0);
      body = JSON.stringify(Buffer.concat(body)); //option 3: does not pass test but will return any objects we pass in
      // response.statusCode = 201;
      storage.push(body);
      console.log(body, storage);
      statusCode = 201;
      response.writeHead(statusCode, headers);
      response.end(body);
    });

  } else {
    statusCode = 404;
    // response.statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end();
  }
  // console.log('Serving request type ' + request.method + ' for url ' + request.url);
  // var statusCode = 200;
  // headers['Content-Type'] = 'application/json';
  // // response.statusCode = statusCode;
  // response.writeHead(statusCode, headers);
  // response.end('Hello, world');

};

// The outgoing status.

// See the note below about CORS headers.
// var headers = defaultCorsHeaders;

// Tell the client we are sending them plain text.
//
// You will need to change this if you are sending something
// other than plain text, like JSON or HTML.
// headers['Content-Type'] = 'text/plain';

// .writeHead() writes to the request line and headers of the response,
// which includes the status and all headers.
// response.writeHead(statusCode, headers);

// Make sure to always call response.end() - Node may not send
// anything back to the client until you do. The string you pass to
// response.end() will be the body of the response - i.e. what shows
// up in the browser.
//
// Calling .end "flushes" the response's internal buffer, forcing
// node to actually send all the data over to the client.
// };

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

exports.handleRequest = requestHandler;