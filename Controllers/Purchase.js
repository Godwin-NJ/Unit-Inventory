const Purchase = require("../Models/PurchaseModel");
const { StatusCodes } = require("http-status-codes");
const InventoryModel = require("../Models/InventoryModel");
const vendorModel = require("../Models/VendorModel");

// purchase from vendor
//single purchase , multiple purchase
const stockPurchase = async (req, res) => {
  // check if item and vendor exist in respective tables
  const { vendor, vendorItem, itemQuantity, unitOfMeasure } = req.body;
  if (!vendor || !vendorItem || !itemQuantity || !unitOfMeasure) {
    console.log("empty field detected");
  }
  const Items = await Purchase.create(req.body);
  res.status(StatusCodes.CREATED).json(Items);
};

const AllPurchaseDone = async (req, res) => {
  const items = await Purchase.find({});
  const vendor = await vendorModel.find({});
  const inventory = await InventoryModel.find({});

  let populatedStock = [];
  items.forEach((purchasedItem) => {
    let VendorName = vendor.find((vendorItem) =>
      purchasedItem.vendor.equals(vendorItem._id)
    );
    // console.log(VendorName, "forVendor");
    let InventoryStock = inventory.find((InventoryItem) =>
      purchasedItem.vendorItem.equals(InventoryItem._id)
    );
    // console.log(InventoryStock, "forInventory");
    if (VendorName && InventoryStock) {
      populatedStock.push({
        id: purchasedItem._id,
        vendor: VendorName.vendorName,
        vendorItem: InventoryStock.item,
        itemQuantity: purchasedItem.itemQuantity,
        unitOfMeasure: purchasedItem.unitOfMeasure,
      });
    }
  });

  res
    .status(StatusCodes.OK)
    .json({ populatedStock, count: populatedStock.length });
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
