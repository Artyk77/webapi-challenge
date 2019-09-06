const express = require("express");
const projectRouter = require("./projects/projectRouter.js");

const server = express();

server.use(express.json());
server.use("/projects", projectRouter);


server.get("/", (req, res) => {
    res.status(200).send(`<h2>It is working!!!</h2>`);
});
module.exports = server;