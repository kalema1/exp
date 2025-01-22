const mongoose = require("mongoose");
const validator = require("validator");

// user schema

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is Required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "User email address is Required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      minlength: 8,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Password is Required"],
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

//create User model from the user schema
const User = mongoose.model("User", userSchema);

module.exports = User;
