const express = require("express");
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopFiveTours,
} = require("./../controllers/tourController");

const router = express.Router();

//param middleware
//router.param("id", checkID);

// alias route - we use middleware function first b4 we call the get all tours function
router.route("/top-5-cheap").get(aliasTopFiveTours, getAllTours);

router.route("/").get(getAllTours).post(createTour);

router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
