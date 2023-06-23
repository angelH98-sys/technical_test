const { request, response } = require("express");

const { Country } = require("../model/country.model");
const {
  getRecordsResponse,
  unHandledExceptionResponse,
} = require("../helper/response.helper");

/**
 * Create a new Country in countries table.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns CustomResponse object with the data or error
 */
const createCountry = async (req = request, res = response) => {
  const { name } = req.body;

  const country = new Country({ name });

  let response;

  try {
    await country.save();
    response = getRecordsResponse(country);
  } catch (unhandledError) {
    console.error(unhandledError);
    response = unHandledExceptionResponse();
  }
  return res.status(response.status).json(response);
};

module.exports = {
  createCountry,
};
