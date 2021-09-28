const server = require('node-http-server');

server.deploy(
  {
    port: 3000,
    root: "./public"
  }
);

console.log("hosted on localhost:3000");