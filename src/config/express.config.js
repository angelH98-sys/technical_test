const Express = require("express");
const cors = require("cors");

const { connectToDatabase } = require("./database.config");
const { CountryRouter } = require("../routes/country.routes");
const { UserRouter } = require("../routes/user.routes");

/**
 * Class to set-up express server.
 * - Creates a new server
 * - Connect to DB through sequelize
 * - Set API routes
 * - Expose a method to listen
 *
 */
class ExpressServer {
  constructor() {
    this.port = process.env.PORT;

    this.app = Express();
    this.middlewares();
    this.databaseConnection();
    this.routes();
  }

  middlewares() {
    //To support Cross-Origin Resource Sharing
    this.app.use(cors());
    //To parse request to JSON
    this.app.use(Express.json());
  }

  async databaseConnection() {
    await connectToDatabase();
  }

  routes() {
    this.app.use(process.env.PATH_COUNTRIES, CountryRouter);
    this.app.use(process.env.PATH_USERS, UserRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.info(`Server working in port ${this.port}`);
    });
  }
}

module.exports = {
  ExpressServer,
};
