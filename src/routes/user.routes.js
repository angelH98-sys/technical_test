const { Router } = require("express");

const {
  createUser,
  getPaginatedUsers,
} = require("../controller/user.controller");
const { checkUserValidators } = require("../middlewares/user.middleware");
const { checkValidCountryId } = require("../middlewares/country.middleware");

const UserRouter = Router();

UserRouter.post("/", [checkUserValidators, checkValidCountryId], createUser);

UserRouter.get("/", getPaginatedUsers);

module.exports = {
  UserRouter,
};
