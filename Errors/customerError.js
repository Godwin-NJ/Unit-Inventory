class customError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = customError;
