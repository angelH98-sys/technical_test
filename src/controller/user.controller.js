const { request, response } = require("express");
const { User } = require("../model/user.model");
const {
  getRecordsResponse,
  unHandledExceptionResponse,
  getRecordResponseWithMetadata,
} = require("../helper/response.helper");

/**
 * Creates new user in database
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns CustomResponse object with records or errors
 */
const createUser = async (req = request, res = response) => {
  const { name, mail, countryId } = req.body;

  let response;

  try {
    const user = new User({ name, mail, countryId });
    await user.save();
    response = getRecordsResponse(user);
  } catch (unhandledError) {
    console.error(unhandledError);
    response = unHandledExceptionResponse();
  }
  return res.status(response.status).json(response);
};

const getPaginatedUsers = async (req = request, res = response) => {
  const { limit = 5, offset = 0 } = req.query;
  let response;

  try {
    const { count: total, rows: records } = await User.findAndCountAll({
      offset,
      limit,
    });

    response = getRecordResponseWithMetadata(records, limit, offset, total);
  } catch (unhandledError) {
    console.error(unhandledError);
    response = unHandledExceptionResponse();
  }
  return res.status(response.status).json(response);
};

module.exports = {
  createUser,
  getPaginatedUsers,
};
