const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../Errors");

const createJwt = async ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return token;
};

const verifyJwtToken = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    throw new BadRequestError("Issue verying user token");
  }
  return decoded;
};

module.exports = {
  createJwt,
  verifyJwtToken,
};
