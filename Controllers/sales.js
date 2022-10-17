const { StatusCodes } = require("http-status-codes");
const Sales = require("../Models/SalesModel");

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
  const salesOrder = await Sales.find({});
  res.status(StatusCodes.OK).json({ salesOrder });
};

module.exports = {
  saleToCustomer,
  getAllSales,
};
