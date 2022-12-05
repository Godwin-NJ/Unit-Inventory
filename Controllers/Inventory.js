const Inventory = require("../Models/InventoryModel");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../Errors");
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
  if (!itemId) {
    throw new NotFoundError("stock does not exist");
  }
  const stockItem = await Inventory.findOne({ _id: itemId });
  res.status(StatusCodes.OK).json({ stockItem });
};

const stockHolding = async (req, res) => {
  // This will eventually be matched by active property ,
  //which will be used to separate active and inactive stock
  const holding = await Inventory.aggregate([
    {
      $project: {
        item: 1,
        itemCode: 1,
        itemVolume: { unitOfMeasure: 1, quantity: 1 },
      },
    },
  ]);

  // console.log(holding, "holding");

  if (!holding) {
    throw new BadRequestError("not found");
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
