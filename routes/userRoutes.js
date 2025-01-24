const express = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  DeleteUser,
} = require("./../controllers/userController");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).patch(updateUser).delete(DeleteUser);

module.exports = router;
