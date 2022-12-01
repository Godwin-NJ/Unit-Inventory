const { StatusCodes } = require("http-status-codes");
const customerError = require("./customerError");
// StatusCodes
class NotFoundError extends customerError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
