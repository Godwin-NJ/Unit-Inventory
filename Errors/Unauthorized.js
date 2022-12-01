const { StatusCodes } = require("http-status-codes");
const customerError = require("./customerError");
// StatusCodes
class UnauthorizedError extends customerError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.FORBIDDEN;
  }
}

module.exports = UnauthorizedError;
