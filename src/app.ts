import express from "express";
import morgan from "morgan";
import routes from "./routes";

const server = express();
const cors = require("cors");

const corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200 
}

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

server.use(cors());
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(morgan("dev"));

server.use("/api", routes);

export default server;
