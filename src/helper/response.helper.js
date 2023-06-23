const { CustomResponse } = require("./Response");

/**
 * Return all the errors from the model validation
 *
 * @param {SequelizeValidationError} errors
 * @returns Object of type CustomResponse with errors
 */
const getErrorResponseFromModelErrors = (errors = []) => {
  const response = new CustomResponse();
  response.status = 400;

  errors.forEach((error) => {
    response.addError("model", error.message, error.path);
  });

  return response;
};

/**
 * Get a CustomResponse object with records from an object/array.
 *
 * @param {Object[]} records
 * @returns Object of type CustomResponse with records
 */
const getRecordsResponse = (records) => {
  const response = new CustomResponse();
  response.status = 200;

  Array.isArray(records)
    ? records.forEach((record) => response.addRecord(record))
    : response.addRecord(records);

  return response;
};

/**
 * Get a CustomResponse object with a generic error message.
 *
 * @returns Object of type CustomResponse with error
 */
const unHandledExceptionResponse = () => {
  const response = new CustomResponse();
  response.status = 500;

  const message = "Something bad happened, please contact IT";

  response.addError("Local", message);

  return response;
};

const modelNotFoundWithId = (modelName, id) => {
  const response = new CustomResponse();
  response.status = 404;

  const message = `${modelName} not found with id ${id}`;

  response.addError("Local", message);

  return response;
};

const modelInactiveWithId = (modelName, id) => {
  const response = new CustomResponse();
  response.status = 404;

  const message = `${modelName} not active id ${id}`;

  response.addError("Local", message);

  return response;
};

const getRecordResponseWithMetadata = (records, limit, skip, total) => {
  const response = new CustomResponse();
  response.status = 200;

  records.forEach((record) => response.addRecord(record));

  response.setMetadata(limit, skip, total);

  return response;
};

module.exports = {
  getErrorResponseFromModelErrors,
  getRecordsResponse,
  unHandledExceptionResponse,
  modelNotFoundWithId,
  modelInactiveWithId,
  getRecordResponseWithMetadata,
};
