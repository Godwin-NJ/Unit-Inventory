const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { NotFoundError, UnauthenticatedError } = require("../Errors");

const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};
const userSchema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      maxLength: 15,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      maxLength: 15,
      minLength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "user", "storeKeeper"],
      default: "user",
    },
  },
  { timestamps: true }
);

//hash password
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  if (!hashedPassword) {
    throw new NotFoundError("error hashing password");
  }
  this.password = hashedPassword;
});

userSchema.method("createJWT", async function () {
  return await jwt.sign(
    {
      userID: this._id,
      userName: this.userName,
      email: this.email,
      role: this.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );
});

userSchema.method("comparePassword", async function (userPassword) {
  const isValid = await bcrypt.compare(userPassword, this.password);
  return isValid;
});

module.exports = mongoose.model("User", userSchema);
