const {
  DataTypes: { INTEGER, STRING },
} = require("sequelize");

const { sequelize } = require("../config/database.config");
const { Country } = require("./country.model");

const User = sequelize.define(
  "users",
  {
    id: {
      field: "id",
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      field: "name",
      type: STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "User name is required",
        },
        notEmpty: {
          msg: "User name is required",
        },
      },
    },
    mail: {
      field: "mail",
      type: STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Mail is required",
        },
        isEmail: {
          msg: "Invalid mail format",
        },
      },
    },
    countryId: {
      field: "country_id",
      type: INTEGER,
      references: {
        model: Country,
        key: "id",
      },
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = {
  User,
};
