const jwt = require("jsonwebtoken");
const { promisify } = require("util");
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
    passwordChangedAt: req.body.passwordChangedAt,
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

exports.protect = catchAsync(async (req, res, next) => {
  // 1) getting the token and checking if its there
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in!"));
  }

  // 2)verifying token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError("The user beloging to this token nolonger exist", 401)
    );
  }

  // 4) check if user changed password after token was issued
  if (freshUser.changesPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User Recently chenged password! Please login again!", 401)
    );
  }

  // grant access to protected route
  req.user = freshUser;
  next();
});
