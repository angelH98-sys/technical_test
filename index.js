require("dotenv").config();

const { ExpressServer } = require("./src/config/express.config");

const server = new ExpressServer();

server.listen();
