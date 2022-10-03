const mongoose = require("mongoose");
const { Schema } = mongoose;

const VendorSchema = new Schema(
  {
    vendorName: {
      type: String,
      required: true,
      unique: true,
      maxLength: 700,
      trim: true,
    },
    vendorAddress: {
      type: String,
      required: true,
      maxLength: 1000,
      trim: true,
    },
    vendorCode: {
      type: String,
      trim: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", VendorSchema);
