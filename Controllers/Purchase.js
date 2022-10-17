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
  const items = await Purchase.find({});
  // const vendor = await vendorModel.find({});
  // const inventory = await InventoryModel.find({});

  // let populatedStock = [];
  // items.forEach((purchasedItem) => {
  //   let VendorName = vendor.find((vendorItem) =>
  //     purchasedItem.vendor.equals(vendorItem._id)
  //   );
  // console.log(VendorName, "forVendor");
  // let InventoryStock = inventory.find((InventoryItem) =>
  //   purchasedItem.vendorItem.equals(InventoryItem._id)
  // );
  // console.log(InventoryStock, "forInventory");
  //   if (VendorName && InventoryStock) {
  //     populatedStock.push({
  //       id: purchasedItem._id,
  //       vendor: VendorName.vendorName,
  //       vendorItem: InventoryStock.item,
  //       itemQuantity: purchasedItem.itemQuantity,
  //       unitOfMeasure: purchasedItem.unitOfMeasure,
  //       unitPrice: purchasedItem.unitPrice,
  //       invoiceNumber: purchasedItem.invoiceNumber,
  //     });
  //   }
  // });
  res.status(StatusCodes.OK).json({ items, count: items.length });
  // res
  //   .status(StatusCodes.OK)
  //   .json({ populatedStock, count: populatedStock.length });
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
