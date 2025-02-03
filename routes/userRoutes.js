const express = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  DeleteUser,
} = require("./../controllers/userController");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
  restrictTo,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

//protect routes after this middleware
router.use(protect);

router.patch("/updateMyPassword", updatePassword);

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).patch(updateUser).delete(DeleteUser);

module.exports = router;
