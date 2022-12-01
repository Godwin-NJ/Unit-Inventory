const mongoose = require("mongoose");
const { Schema } = mongoose;

// Add an active property
const InventorySchema = new Schema(
  {
    item: {
      type: String,
      required: true,
      maxLength: "200",
      unique: true,
      trim: true,
      required: true,
    },
    itemCode: {
      // 01-115
      type: String,
      required: true,
      maxLength: 6,
      unique: true,
      trim: true,
      required: true,
    },
    cartonUnit: {
      type: Number,
      enum: [6, 12],
      required: true,
    },
    itemVolume: [
      {
        unitOfMeasure: {
          type: String,
          enum: ["Bottle", "Carton"],
          // unique: true,
          trim: true,
        },

        quantity: {
          type: Number,
          trim: true,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", InventorySchema);
