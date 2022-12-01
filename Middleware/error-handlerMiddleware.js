const errorHandler = async (err, req, res, next) => {
  // you can track specific errors here as well....Do this eventually as its important
  res.status(500).send({ msg: "Something went wrong, please try again" });
};

module.exports = errorHandler;
