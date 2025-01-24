const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("./../models/userModel");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // 1)check ifemail and password exist
  if (!email || !password) {
    return next(new AppError("Please Provide email and password", 400));
  }

  // 2)check if user exist and password in correct
  const user = await User.findOne({ email }).select("+password");

  const isCorrectPassword = await user.correctPassword(password, user.password);

  if (!user || !isCorrectPassword) {
    return next(new AppError("Incorrect email or password", 401));
  }

  console.log(user);
  //3) if everything is okay send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
};
