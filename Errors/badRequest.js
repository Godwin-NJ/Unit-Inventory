const { StatusCodes } = require("http-status-codes");
const customerError = require("./customerError");
// StatusCodes
class BadRequestError extends customerError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
