import { Router } from "express";
import {
  getUserProfile,
//   updateUserProfile,
  changePassword,
  deleteAccount,
} from "../controllers/user.controller.ts";
import { authenticate } from "../middlewares/auth.middleware.ts";
import { authorizedRoles } from "../middlewares/rbac.middleware.ts";

const router = Router();

router.get("/profile", authenticate, authorizedRoles("Driver", "Rider"), getUserProfile);
// router.put("/profile", authenticate, authorizedRoles("Driver", "Rider"), updateUserProfile);
router.put("/change-password", authenticate, authorizedRoles("Driver", "Rider"), changePassword);
router.delete("/delete", authenticate, authorizedRoles("Driver", "Rider"), deleteAccount);

export default router;
