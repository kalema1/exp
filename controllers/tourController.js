const Tour = require("./../models/tourModel");
const APIFeatures = require("../utils/apiFeatures");

// create a check body middleware
// check if body contains the price and name properties
// if not send 400 bad request
// add it to the post handler stack
/* exports.checkBody = (req, res, next) => {
  const hasPrice = req.body.price;
  const hasName = req.body.name;

  if (!hasPrice || hasName) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or Price",
    });
  }

  next();
};
 */

exports.aliasTopFiveTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,difficulty";

  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // BUILD QUERY
    /* // 1B) FILTERING
    // create a copy of query object
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    let query = Tour.find(JSON.parse(queryStr));
     */

    // 2) Sorting
    /* if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort({ createdAt: "asc" });
    } */

    //3) Field limiting
    /* if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      console.log("FIELDS", fields);
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    } */

    //4. Pagination
    /* const page = req.query.page * 1 || 1;

    const limit = req.query.limit * 1 || 100;

    const skip = (page - 1) * limit;

    // page=3&limit=10,1-10 page 1 11-20 page 2, 21-30 page 3

    query = query.skip(skip).limit(limit); */

    //Execute query
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;

    res.status(200).json({
      status: "success",
      results: tours.length,
      data: { tours },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findById(id);

    res.status(200).json({
      status: "success",
      data: { tour },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "invalid data sent!",
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const id = req.params.id;
    await Tour.findByIdAndDelete(id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
