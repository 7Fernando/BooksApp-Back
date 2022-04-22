import express from "express";
import morgan from "morgan";
import routes from "./routes";

import { verifyToken } from "./middleware/auth";

var jwks = require('jwks-rsa');
const server = express();
const cors = require("cors");


// var jwtCheck = expressjwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: "https://dev-0h7i5plo.us.auth0.com/.well-known/jwks.json",
//   }),
//   audience: "this is a unique indentifier ",
//   issuer: "https://dev-0h7i5plo.us.auth0.com/",
//   algorithms: ["RS256"],
// }).unless({ path: ["api/books/"] });

//   server.use(jwtCheck);

// server.use(verifyToken)

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});


server.use(cors("cors"));
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(morgan("dev"));

server.use("/api", routes);

export default server;
