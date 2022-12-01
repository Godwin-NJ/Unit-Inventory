const { StatusCodes } = require("http-status-codes");
const customerError = require("./customerError");
// StatusCodes
class UnauthenticatedError extends customerError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
