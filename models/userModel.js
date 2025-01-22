const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
      validate: {
        // works only on create new object and  save
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are NOT the same!",
      },
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined; // delete the passwordConfirm data
});

//create User model from the user schema
const User = mongoose.model("User", userSchema);

module.exports = User;
