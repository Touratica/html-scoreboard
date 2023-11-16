#!/usr/bin/env node

const http = require("http-server");
const path = require("path");
const port = 8080;

const root = path.resolve(__dirname, "../dist");

http
  .createServer({ root: root }, function (_, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World\n");
  })
  .listen(port);

console.log(`Server running at http://localhost:${port}/`);
