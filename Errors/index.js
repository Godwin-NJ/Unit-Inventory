const NotFoundError = require("./Notfound");
const UnauthorizedError = require("./Unauthorized");
const UnauthenticatedError = require("./unauthenticated");
const BadRequestError = require("./badRequest");
const CustomAError = require("./customerError");

module.exports = {
  NotFoundError,
  UnauthorizedError,
  UnauthenticatedError,
  BadRequestError,
  CustomAError,
};
