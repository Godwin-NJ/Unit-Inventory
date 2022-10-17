const { StatusCodes } = require("http-status-codes");
const Customer = require("../Models/CustomerModel");

const createCustomer = async (req, res) => {
  const { name, address, PhoneNumber } = req.body;
  if (!name || !address || !PhoneNumber) {
    return;
  }

  const customerAcc = await Customer.create({ name, address, PhoneNumber });
  res.status(StatusCodes.CREATED).json({ customerAcc });
};

const getAllCustomer = async (req, res) => {
  const Allcustomer = await Customer.find({});
  res.status(StatusCodes.OK).json(Allcustomer);
};

module.exports = {
  createCustomer,
  getAllCustomer,
};
