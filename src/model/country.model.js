const {
  DataTypes: { INTEGER, STRING, BOOLEAN },
} = require("sequelize");

const { sequelize } = require("../config/database.config");

const Country = sequelize.define(
  "countries",
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
          msg: "Country name could not be null",
        },
        notEmpty: {
          msg: "Country name is required",
        },
      },
    },
    status: {
      field: "status",
      type: BOOLEAN,
      defaultValue: true,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = {
  Country,
};
