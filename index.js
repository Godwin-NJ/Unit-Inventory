const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const connectDB = require("./connect");
const morgan = require("morgan");
const inventoryRoute = require("./Routes/inventoryRoute");

// middleware
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("unit inventory");
});

// routes
app.use("/api/v1/inventory", inventoryRoute);

const port = 3000;
const connectApp = async () => {
  const url = process.env.MONGO_DB;
  await connectDB(url);
  app.listen(port, () => {
    console.log(`app listening on port ${port}...`);
  });
};

connectApp();
