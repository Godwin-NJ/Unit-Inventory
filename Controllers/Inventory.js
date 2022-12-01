const Inventory = require("../Models/InventoryModel");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../Errors");
const createProduct = async (req, res) => {
  // const { item, itemCode, unitOfMeasure , } = req.body;
  const stocks = await Inventory.create(req.body);
  if (!stocks) {
    throw new BadRequestError("Error creating inventory stock");
  }
  res.status(StatusCodes.CREATED).json(stocks);
};

const createSingleProduct = async (req, res) => {
  res.send("createSingleProduct");
};

const getAllProduct = async (req, res) => {
  const stocks = await Inventory.find({});
  res.status(StatusCodes.OK).json({ stocks, count: stocks.length });
};

const getSingleproduct = async (req, res) => {
  const itemId = req.params.id;
  const stockItem = await Inventory.findOne({ _id: itemId });
  res.status(StatusCodes.OK).json({ stockItem });
};

const stockHolding = async (req, res) => {
  // This will eventually be matched by active property ,
  //which will be used to separate active and inactive stock
  const holding = await Inventory.aggregate([
    { $project: { _id: 0, item: 1, itemCode: 1 } },
  ]);

  console.log(holding, "holding");

  if (!holding) {
    // throw new Eroror
    // console.log(err, "err");
    return;
  }
  res.status(StatusCodes.OK).json(holding);
};

module.exports = {
  createProduct,
  createSingleProduct,
  getAllProduct,
  getSingleproduct,
  stockHolding,
};
