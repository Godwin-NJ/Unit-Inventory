const { StatusCodes } = require("http-status-codes");
const Sales = require("../Models/SalesModel");
const { BadRequestError } = require("../Errors");

const saleToCustomer = async (req, res) => {
  const { customerOrder, customer } = req.body;
  for (const item of customerOrder) {
    const { stock, quantity, unitPrice, unitType, totalPrice } = item;
    if (!stock || !quantity || !unitType || !customer || !unitPrice) {
      return;
    }

    // let unitTotal = unitPrice * quantity;
    // totalPrice === unitTotal;
  }

  const customerINV = await Sales.create({ customerOrder, customer });
  res.status(StatusCodes.CREATED).json(customerINV);
};

const getAllSales = async (req, res) => {
  const salesOrder = await Sales.find({})
    .populate({
      path: "customer",
      select: "name",
    })
    .populate({ path: "customerOrder.stock", select: "item" });
  if (!salesOrder) {
    throw new BadRequestError("error in getting all sales");
  }
  res.status(StatusCodes.OK).json(salesOrder);
};

const getSingleSale = async (req, res) => {
  const singleSales = await Sales.findOne({ _id: req.params.id });
  res.status(StatusCodes.OK).json(singleSales);
};

module.exports = {
  saleToCustomer,
  getAllSales,
  getSingleSale,
};
