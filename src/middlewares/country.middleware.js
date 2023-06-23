const { request, response } = require("express");

const { Country } = require("../model/country.model");
const { getModelErrors } = require("./model.middleware");
const {
  unHandledExceptionResponse,
  modelNotFoundWithId,
  modelInactiveWithId,
} = require("../helper/response.helper");

/**
 * Check model validators for Countries
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {} next
 * @returns If model has error, return a CustomResponse with error; if it is not errors, executes next
 */
const checkCountryValidators = async (req = request, res = response, next) => {
  const { name } = req.body;
  const country = new Country({ name });
  const errorResponse = await getModelErrors(country);
  if (errorResponse) {
    return res.status(errorResponse.status).json(errorResponse);
  }
  next();
};

/**
 * Check if request.body.countryId is an id of a country.
 * If it exist, checks if is enable (status = true)
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {} next
 * @returns
 */
const checkValidCountryId = async (req = request, res = response, next) => {
  const { countryId } = req.body;

  let response;

  try {
    const result = await Country.findByPk(countryId);

    if (!result) {
      response = modelNotFoundWithId("Countries", countryId);
      return res.status(response.status).json(response);
    }

    if (!result.dataValues.status) {
      response = modelInactiveWithId("Countries", countryId);
      return res.status(response.status).json(response);
    }
  } catch (unhandledError) {
    console.error(unhandledError);
    response = unHandledExceptionResponse();
    return res.status(response.status).json(response);
  }
  next();
};

module.exports = {
  checkCountryValidators,
  checkValidCountryId,
};
