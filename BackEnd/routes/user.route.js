import express from "express";
import {
  allUsers,
  login,
  logout,
  signup,
  updateAvatar,
} from "../controller/user.controller.js";
import secureRoute from "../middleware/secureRoute.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allusers", secureRoute, allUsers);
router.patch("/avatar", secureRoute, updateAvatar);

export default router;
