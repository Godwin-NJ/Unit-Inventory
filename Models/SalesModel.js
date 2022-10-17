const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const salesSchema = new Schema(
  {
    customerOrder: [
      {
        stock: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Inventory",
        },
        quantity: {
          type: Number,
          required: true,
          trim: true,
        },
        unitType: {
          type: String,
          required: true,
          enum: ["CTN", "Bottle", "Pieces"],
          default: "CTN",
        },
        // unit price should point to the price tables table
        unitPrice: {
          type: Number,
          required: true,
        },
        //calculation of total price is a challenge, going to pass this through the controllers
        totalPrice: {
          type: Number,
          trim: true,
          //   required: true,
        },
      },
    ],
    // this is being provided thru the pre save hook
    salesNumber: {
      type: String,
      trim: true,
    },
    //the customer is picked from the customer collection
    customer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    total: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

salesSchema.pre("save", async function () {
  const UUID = uuidv4();
  const PIN = UUID.split("-");
  const LastNumberPIN = PIN[PIN.length - 1];
  const PIN_NUMBER = `SIN-${LastNumberPIN}`;
  // sales invoice number below
  this.salesNumber = PIN_NUMBER;
  // calculation of total price && total
  let sumTotal = 0;
  this.customerOrder.map((item) => {
    const unitTotal = item.unitPrice * item.quantity;
    item.totalPrice = unitTotal;

    sumTotal += item.totalPrice;
  });
  this.total = sumTotal;
});

module.exports = mongoose.model("Sale", salesSchema);
