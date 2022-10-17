const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");
const vendorModel = require("../Models/VendorModel");
const InventoryModel = require("../Models/InventoryModel");

const PurchaseSchema = new Schema(
  {
    purchase: [
      {
        vendorItem: {
          type: Schema.Types.ObjectId,
          ref: "Inventory",
          required: true,
        },
        itemQuantity: {
          type: Number,
          trim: true,
          required: true,
        },
        unitOfMeasure: {
          type: String,
          enum: ["Bottle", "Carton", "Pieces"],
          trim: true,
          required: true,
        },
        unitPrice: {
          type: Number,
          trim: true,
        },
      },
    ],
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    invoiceNumber: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

PurchaseSchema.pre("save", async function (next) {
  const UUID = uuidv4();
  const PIN = UUID.split("-");
  const LastNumberPIN = PIN[PIN.length - 1];
  const PIN_NUMBER = `PIN-${LastNumberPIN}`;
  // console.log(PIN_NUMBER, "PIN NUMBER");
  // below is to assign an invoice number
  this.invoiceNumber = PIN_NUMBER;
  // console.log(this.purchase);

  // for (const item of this.purchase) {
  //   const invName = await InventoryModel.findOne({ _id: item.vendorItem });
  //   item.vendorItem = invName.item;
  // }

  // const venName = await vendorModel.findOne({ _id: this.vendor });
  // this.vendor = venName.vendorName;

  next();
});

module.exports = mongoose.model("Purchase", PurchaseSchema);
