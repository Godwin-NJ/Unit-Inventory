const Purchase = require("../Models/PurchaseModel");
const { StatusCodes } = require("http-status-codes");
const InventoryModel = require("../Models/InventoryModel");
const vendorModel = require("../Models/VendorModel");

const stockPurchase = async (req, res) => {
  const { vendor, vendorItem, itemQuantity, unitOfMeasure, unitPrice } =
    req.body;
  if (!vendor || !vendorItem || !itemQuantity || !unitOfMeasure || !unitPrice) {
    console.log("empty field detected");
    return;
  }

  const Items = await Purchase.create([req.body]);
  const vendorUserModel = await vendorModel.find({});
  const inventoryModel = await InventoryModel.find({});
  const suppliedStockByVendor = [];
  // loop thru models
  for (const stock of Items) {
    const vendorUser = vendorUserModel.find((ved) =>
      stock.vendor.equals(ved._id)
    );
    const inventory_Stock = inventoryModel.find((inv) =>
      stock.vendorItem.equals(inv._id)
    );
    const itemInfo = Items[0];
    suppliedStockByVendor.push({
      vendor: vendorUser.vendorName,
      vendorItem: inventory_Stock.item,
      itemQuantity: itemInfo.itemQuantity,
      unitOfMeasure: itemInfo.unitOfMeasure,
      unitPrice: itemInfo.unitPrice,
      invoiceNumber: itemInfo.invoiceNumber,
      Id: itemInfo._id,
    });
  }
  res.status(StatusCodes.CREATED).json(suppliedStockByVendor);
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
        unitPrice: purchasedItem.unitPrice,
        invoiceNumber: purchasedItem.invoiceNumber,
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
