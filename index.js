const dotenv = require("dotenv");
dotenv.config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./connect");
const morgan = require("morgan");
const cors = require("cors");
const { MONGO_IP, MONGO_PORT } = require("./config/config");
// security
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
// routes
const inventoryRoute = require("./Routes/inventoryRoute");
const vendorRoute = require("./Routes/VendorRoute");
const purchaseRoute = require("./Routes/PurchaseRoute");
const customerRoute = require("./Routes/customerRoute");
const salesRoute = require("./Routes/salesRoute");
const authRouter = require("./Routes/userAuthRoute");
// error handling
const NotFoundMiddleware = require("./Middleware/notFound");
const errorHandler = require("./Middleware/error-handlerMiddleware");

// Swagger
// const swaggerUi = require("swagger-ui-express");
// const YAML = require("yamljs");
// const swaggerDocument = YAML.load("./swagger.yaml");
// middleware
app.set("trust proxy", 1);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// app.use(morgan("tiny")); //set up a condition to log this only when ur in development
app.use(express.json());
app.use(cors());
app.use(mongoSanitize());
app.use(limiter);
app.use(helmet());
app.use(xss());

//this confirms that our API is up
// app.get("/", (req, res) => {
//   res.send("<h1>Api Docs</h1>");
// });
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routes
app.use("/api/v1/inventory", inventoryRoute);
app.use("/api/v1/vendor", vendorRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/customer", customerRoute);
app.use("/api/v1/sales", salesRoute);
app.use("/api/v1/user", authRouter);

app.use(express.static("public"));

app.use(NotFoundMiddleware);
app.use(errorHandler);

const port = process.env.PORT || 3000;
const connectApp = async () => {
  // const url = process.env.MONGO_DB;
  const url =
    "mongodb+srv://sa:unitExcel747@cluster0.4osfo2k.mongodb.net/?retryWrites=true&w=majority";
  // const url = `mongodb://${MONGO_IP}:${MONGO_PORT}`;
  connectDB(url);
  app.listen(port, () => {
    console.log(`app listening on port ${port}...`);
  });
};

connectApp();
