const express = require("express");
const {
  register,
  getUsers,
  getUser,
  editUser,
  login,
  deleteUser,
  changeStatusBiz,
} = require("../controller/userController");
const auth = require("../../auth/authService");
const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.get("/", auth, getUsers);
router.get("/:id", auth, getUser);
router.put("/:id", auth, editUser);
router.patch("/:id", auth, changeStatusBiz);
router.delete("/:id", auth, deleteUser);

module.exports = router;
