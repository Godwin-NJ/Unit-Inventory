const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 500,
      unique: true,
    },
    address: {
      type: String,
      required: true,
      maxLength: 500,
    },
    PhoneNumber: {
      type: Number,
      required: true,
      trim: true,
    },

    customerNumber: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

customerSchema.pre("save", async function () {
  const UUID = uuidv4();
  const PIN = UUID.split("-");
  const LastNumberPIN = PIN[PIN.length - 1];
  const PIN_NUMBER = `CN-${LastNumberPIN}`;
  this.customerNumber = PIN_NUMBER;
});

module.exports = mongoose.model("Customer", customerSchema);
