const http = require("http");
const app = require("./app");
const connectDb = require('./db/db');

connectDb();
const server = http.createServer(app);

server.listen(3003, () => {
  console.log("Ride service listening on port 3003");
});
