const express = require("express");
const helmet = require("helmet")
const welcomeRouter = require("./api/welcomeRouter")
const carsRouter = require("./api/carRouter")
const server = express();

server.use(express.json());
server.use(helmet())
server.use(welcomeRouter)
server.use("/api/cars", carsRouter)

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong, please try again later",
  });
});



module.exports = server;