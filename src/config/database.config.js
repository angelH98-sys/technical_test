const { Sequelize } = require("sequelize");

const database = process.env.DATABASE_NAME;
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const host = process.env.DATABASE_HOST;
const dialect = process.env.DATABASE_DIALECT;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.info("Connected to database");
  } catch (databaseConnectionError) {
    console.error(`Error connecting to database: ${databaseConnectionError}`);
  }
};

module.exports = {
  connectToDatabase,
  sequelize,
};
