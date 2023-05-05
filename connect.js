const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASS } = require("./config/config");
const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    // the below is for mongo-db docker container
    // await mongoose.connect(url, {
    //   auth: {
    //     authSource: "admin",
    //   },
    //   user: `${MONGO_USER}`,
    //   pass: `${MONGO_PASS}`,
    // });
  } catch (error) {
    console.log(error), setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
