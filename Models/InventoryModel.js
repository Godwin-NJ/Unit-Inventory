const mongoose = require("mongoose");
const { Schema } = mongoose;

const InventorySchema = new Schema(
  {
    item: {
      //carlo rossi red
      type: String,
      required: true,
      maxLength: "200",
      unique: true,
      trim: true,
    },
    itemCode: {
      //01-100
      type: String,
      required: true,
      maxLength: 6,
      unique: true,
      trim: true,
    },
    itemQuantity: {
      type: Number,
      trim: true,
    },
    unitOfMeasure: {
      type: String,
      enum: ["BTL", "CTN", "PCS"],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", InventorySchema);
