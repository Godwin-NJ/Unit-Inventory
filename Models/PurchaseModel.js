const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");
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
      required: true,
    },
    invoiceNumber: {
      type: String,
      trim: true,
    },
    //   add timestamp
  },
  { timestamps: true }
);

PurchaseSchema.pre("save", function (next) {
  const UUID = uuidv4();
  const PIN = UUID.split("-");
  const LastNumberPIN = PIN[PIN.length - 1];
  const PIN_NUMBER = `PIN-${LastNumberPIN}`;
  console.log(PIN_NUMBER, "PIN NUMBER");
  this.invoiceNumber = PIN_NUMBER;
  next();
});

module.exports = mongoose.model("Purchase", PurchaseSchema);
