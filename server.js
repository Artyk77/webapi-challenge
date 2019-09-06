<<<<<<< HEAD
const express = require("express");
const projectRouter = require("./projects/projectRouter.js");

const server = express();

server.use(express.json());
server.use("/projects", projectRouter);


server.get("/", (req, res) => {
    res.status(200).send(`<h2>It is working!!!</h2>`);
});
=======
const express = require('express')

const projectRouter = require('./projects/projectRoutes.js')
const actionRouter = require('./actions/actionRoutes.js')

const server = express();
server.use(express.json())

server.use('/projects', projectRouter)
server.use('/actions', actionRouter)

server.get('/', (req, res) => {
    res.status(200).json({ message: 'API is Up and  Running!'})
})

>>>>>>> a1c8a439619b99f02b9f5535bd7ca54a5895cc8b
module.exports = server;