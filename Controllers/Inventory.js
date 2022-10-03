const Inventory = require("../Models/InventoryModel");
const { StatusCodes } = require("http-status-codes");
const createProduct = async (req, res) => {
  const { item, itemCode } = req.body;
  const stocks = await Inventory.create({ item, itemCode });
  res.status(StatusCodes.CREATED).json({ stocks });
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

module.exports = {
  createProduct,
  createSingleProduct,
  getAllProduct,
  getSingleproduct,
};
