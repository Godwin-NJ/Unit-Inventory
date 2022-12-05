const { StatusCodes } = require("http-status-codes");
const { CustomAError } = require("../Errors");

const errorHandler = async (err, req, res, next) => {
  // if (err instanceof CustomAError) {
  //   res.status(err.statusCode).json({ msg: err.message });
  // }
  let customErr = {
    status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "something went wrong",
  };
  if (err.name === "ValidationError") {
    const displayErr = Object.values(err.errors).map((item) => item.message);

    res.status(StatusCodes.BAD_REQUEST).json({ msg: displayErr });
  }

  if (err.code === 11000) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `${err.keyValue.item} is duplicated` });
  }
  if (err.name === "CastError") {
    res.status(StatusCodes.BAD_REQUEST).json(`${err.value} does not exist`);
  }
  res.status(customErr.status).json(customErr.message); //Final error wrap
};

module.exports = errorHandler;
