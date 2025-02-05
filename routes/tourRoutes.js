const express = require("express");
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopFiveTours,
  getTourStats,
  getToursWithIn,
} = require("./../controllers/tourController");
const { protect } = require("./../controllers/authController");
const { restrictTo } = require("./../controllers/authController");
const reviewRouter = require("./../routes/reviewRoutes");

const router = express.Router();

//param middleware
//router.param("id", checkID);

router.use("/:tourId/reviews", reviewRouter);

// alias route - we use middleware function first b4 we call the get all tours function
router.route("/top-5-cheap").get(aliasTopFiveTours, getAllTours);

router.route("/tour-stats").get(getTourStats);

router
  .route("/")
  .get(getAllTours)
  .post(protect, restrictTo("admin", "lead-guide"), createTour);

router
  .route("/:id")
  .get(getTour)
  .patch(protect, restrictTo("admin", "lead-guide"), updateTour)
  .delete(protect, restrictTo("admin", "lead-guide"), deleteTour);

router
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(getToursWithIn);

module.exports = router;
