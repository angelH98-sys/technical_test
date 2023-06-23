const {
  getErrorResponseFromModelErrors,
} = require("../helper/response.helper");

const getModelErrors = async (model) => {
  let response;
  try {
    await model.validate();
  } catch (errors) {
    response = getErrorResponseFromModelErrors(errors.errors);
  }
  return response;
};

module.exports = {
  getModelErrors,
};
