#!/usr/bin/env node

import { createServer } from "http-server";

const path = require("path");
const port = 8080;

const root = path.resolve(__dirname);

createServer({
  root,
  contentType: "text/html",
}).listen(port);

console.log(`Server running at http://localhost:${port}/`);
