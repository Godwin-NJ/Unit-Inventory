const dotenv = require("dotenv");
dotenv.config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./connect");
const morgan = require("morgan");
const cors = require("cors");
const inventoryRoute = require("./Routes/inventoryRoute");
const vendorRoute = require("./Routes/VendorRoute");
const purchaseRoute = require("./Routes/PurchaseRoute");
const customerRoute = require("./Routes/customerRoute");
const salesRoute = require("./Routes/salesRoute");
const authRouter = require("./Routes/userAuthRoute");
const NotFoundMiddleware = require("./Middleware/notFound");
const errorHandler = require("./Middleware/error-handlerMiddleware");

// middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("unit inventory");
});

// routes
app.use("/api/v1/inventory", inventoryRoute);
app.use("/api/v1/vendor", vendorRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/customer", customerRoute);
app.use("/api/v1/sales", salesRoute);
app.use("/api/v1/user", authRouter);

app.use(NotFoundMiddleware);
app.use(errorHandler);

const port = 3000;
const connectApp = async () => {
  const url = process.env.MONGO_DB;
  await connectDB(url);
  app.listen(port, () => {
    console.log(`app listening on port ${port}...`);
  });
};

connectApp();
