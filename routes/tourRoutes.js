const express = require("express");
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopFiveTours,
  getTourStats,
} = require("./../controllers/tourController");
const { protect } = require("./../controllers/authController");
const { restrictTo } = require("./../controllers/authController");

const router = express.Router();

//param middleware
//router.param("id", checkID);

// alias route - we use middleware function first b4 we call the get all tours function
router.route("/top-5-cheap").get(aliasTopFiveTours, getAllTours);

router.route("/tour-stats").get(getTourStats);

router.route("/").get(protect, getAllTours).post(createTour);

router
  .route("/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo("admin", "lead-guide"), deleteTour);

module.exports = router;
