const mongoose = require("mongoose");
const { Schema } = mongoose;
// const vendorModel = require("../Models/VendorModel");

const PurchaseSchema = new Schema(
  {
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    vendorItem: {
      type: Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
    },
    itemQuantity: {
      type: Number,
      trim: true,
    },
    unitOfMeasure: {
      type: String,
      enum: ["Bottle", "Carton", "Pieces"],
      trim: true,
    },
    //   add timestamp
  },
  { timestamps: true }
);

module.exports = mongoose.model("Purchase", PurchaseSchema);
