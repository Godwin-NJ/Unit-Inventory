const Purchase = require("../Models/PurchaseModel");
const { StatusCodes } = require("http-status-codes");
const InventoryModel = require("../Models/InventoryModel");
const vendorModel = require("../Models/VendorModel");

const stockPurchase = async (req, res) => {
  const { purchase, vendor } = req.body;

  for (const value of purchase) {
    const { vendorItem, itemQuantity, unitOfMeasure, unitPrice } = value;

    if (!vendorItem || !itemQuantity || !unitOfMeasure || !unitPrice) {
      return;
    }
  }

  const vendorUserModel = await vendorModel.findOne({ _id: vendor });

  if (!vendorUserModel) {
    return;
  }

  for (const stock of purchase) {
    const inventoryUserModel = await InventoryModel.findOne({
      _id: stock.vendorItem,
    });
    if (!inventoryUserModel) {
      return;
    }
  }

  const Items = await Purchase.create(req.body);
  res.status(StatusCodes.CREATED).json(Items);
};

const AllPurchaseDone = async (req, res) => {
  const items = await Purchase.find({})
    .populate({
      path: "vendor",
      select: "vendorName",
    })
    .populate({ path: "purchase.vendorItem", select: "item" });

  res.status(StatusCodes.OK).json({ items, count: items.length });
};

const singlePurchase = async (req, res) => {
  const item = await Purchase.findOne({ _id: req.params.id });
  res.status(StatusCodes.OK).json({ item });
};

module.exports = {
  stockPurchase,
  AllPurchaseDone,
  singlePurchase,
};
