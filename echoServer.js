const http = require("http");
const port = 1337;
const url = require("url");
const host = "0.0.0.0";

const server = http.createServer();

server.on("request", (req, res) => {
  let body = [];
  req.on("data", (payload) => {
    body.push(payload);
  }).on("end", () => {
    body = Buffer.concat(body).toString();
    const query = JSON.stringify(url.parse(req.url, true).query);

    console.log(`
    ==== ${req.method} ${req.url}
    
    Headers: ${JSON.stringify(req.headers)}

    Queries: ${query}
    
    Body: ${body}
    `);

    res.write(`
    ==== ${req.method} ${req.url}
    
    Headers: ${JSON.stringify(req.headers)}

    Queries: ${query}
    
    Body: ${body}
    `)

    res.end();
  });
});

server.listen(port, host, function () {
  console.log("Echo server is running on port 1337");
});

