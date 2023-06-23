const { request, response } = require("express");

const { User } = require("../model/user.model");
const { getModelErrors } = require("./model.middleware");

const checkUserValidators = async (req = request, res = response, next) => {
  const { name, mail, countryId } = req.body;
  const user = new User({ name, mail, countryId });
  const errorResponse = await getModelErrors(user);
  if (errorResponse) {
    return res.status(errorResponse.status).json(errorResponse);
  }
  next();
};

module.exports = {
  checkUserValidators,
};
