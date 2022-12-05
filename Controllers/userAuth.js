const { BadRequestError } = require("../Errors");
const User = require("../Models/UserModel");
const { StatusCodes } = require("http-status-codes");

const registerUser = async (req, res) => {
  const { userName, email, password, role } = req.body;
  const validUser = await User.findOne({ userName });
  //check if username already exist
  if (validUser) {
    throw new BadRequestError("Username already exist");
  }
  //check if email already exist
  const validEmail = await User.findOne({ email });
  if (validEmail) {
    throw new BadRequestError("Email already exist");
  }
  const user = await User.create({ userName, email, password, role });
  if (!user) {
    throw new BadRequestError("error creating user");
  }

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    Username: user.userName,
    email: user.email,
    role: user.role,
    token,
  });
};
///user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  //trying to allow user login with either userName of email
  if (!email || !password) {
    throw new BadRequestError("Prvovide all inputs");
  }
  const validUser = await User.findOne({ email });
  if (!validUser) {
    throw new BadRequestError("user or email not found");
  }
  const isPasswordValid = validUser.comparePassword(password);
  if (!isPasswordValid) {
    throw new BadRequestError("invalid credential");
  }
  const token = await validUser.createJWT();
  if (!token) {
    return;
  }
  console.log(token, "token");
  res.status(StatusCodes.OK).json({
    name: validUser.userName,
    email: validUser.email,
    role: validUser.role,
    token,
  });
};

//update Password and role
const updateUser = async (req, res) => {
  const { password, email } = req.body;
  const FindUser = await User.findOne({ _id: req.params.id });
  if (!FindUser) {
    return;
  }
  const UpdateUser = await User.findOneAndUpdate(
    { _id: FindUser._id },
    { password },
    { new: true }
  );
  if (!UpdateUser) {
    throw new BadRequestError("user not found");
  }
  res.status(StatusCodes.OK).json({ msg: "update successful" });
};

module.exports = { registerUser, loginUser, updateUser };
