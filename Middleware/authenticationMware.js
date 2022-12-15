const { UnauthenticatedError, UnauthorizedError } = require("../Errors");
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication error");
  }
  const token = authHeader.split(" ")[1];
  try {
    const { userID, userName, email, role } = jwt.verify(
      token,
      process.env.JWT_SECRET
    ); //confirms that token is Valid
    req.user = { userID, userName, email, role }; //compare user and jwt here ,***Still pending
    // console.log(req.user, "req.user");
    next();
  } catch (error) {
    // console.log(error, "error");
    throw new UnauthenticatedError("Authentication Failed");
  }
};

const authorization = (...roles) => {
  //The roles is an array of roles ['admin', 'User']

  return (req, res, next) => {
    console.log(req.user.role, "req.user.role");

    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("User is unathorized");
    }
    next();
  };
};

module.exports = { authentication, authorization };
