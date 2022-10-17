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

// update vendor information , This should be done by the admin && DataBase Adminstrators only
const updateVendorInfo = async (req, res) => {
  const { vendorName, vendorAddress, vendorCode, phoneNumber } = req.body;
  if (!req.body) {
    console.log("cannot update empty values");
  }
  const { id: vendorId } = req.params;
  const updateVendor = await Vendor.findByIdAndUpdate(
    { _id: vendorId },
    {
      vendorName,
      vendorAddress,
      vendorCode,
      phoneNumber,
    },
    {
      timestamps: true,
      new: true,
    }
  );

  if (!updateVendor) {
    console.log("update cannot be done ");
  }

  res.status(StatusCodes.ACCEPTED).json(updateVendor);
};

module.exports = {
  createVendor,
  getAllVendor,
  getSingleVendor,
  updateVendorInfo,
};
