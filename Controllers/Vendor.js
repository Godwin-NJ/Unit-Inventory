const Vendor = require("../Models/VendorModel");
const { StatusCodes } = require("http-status-codes");
const createVendor = async (req, res) => {
  const vendor = await Vendor.create(req.body);
  res.status(StatusCodes.CREATED).json({ vendor });
};

const getAllVendor = async (req, res) => {
  const vendor = await Vendor.find({});
  res.status(StatusCodes.OK).json({ vendor, count: vendor.length });
};

const getSingleVendor = async (req, res) => {
  const singleVendor = await Vendor.findOne({ _id: req.params.id });
  res.status(StatusCodes.OK).json({ singleVendor });
};

module.exports = {
  createVendor,
  getAllVendor,
  getSingleVendor,
};
