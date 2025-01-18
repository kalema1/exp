const mongoose = require("mongoose");

// tour schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      trim: true,
      maxlength: [40, "A tour must have less or equal to 40 characters"],
      minlength: [10, "A tour must have atlest 10 characters"],
    },
    duration: {
      type: Number,
      required: [true, "A tour must have a duration"],
    },
    maxGroupSize: {
      type: Number,
      require: [true, "A tour must have a group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
    priceDiscount: { type: Number },
    summary: {
      type: String,
      trim: true,
      required: [true, "A Tour must have a summary"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A Tour must have a cover image"],
    },
    images: {
      type: [String],
    },
    startDates: { type: [Date] },
  },
  { timestamps: true }
);

// create a tour model from the tour schema
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
