const { Router } = require("express");

const { createCountry } = require("../controller/country.controller");
const { checkCountryValidators } = require("../middlewares/country.middleware");

const CountryRouter = Router();

CountryRouter.post("/", checkCountryValidators, createCountry);

module.exports = {
  CountryRouter,
};
