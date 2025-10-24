import { Router } from "express";

import {
  getUserProfile,
  changeEmail,
  changeUsername,
  changePassword,
  deleteAccount,
} from "../controllers/user.controller.ts";
import { authenticate } from "../middlewares/auth.middleware.ts";
import { authorizedRoles } from "../middlewares/rbac.middleware.ts";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User profile management and account operations
 */

/**
 * @swagger
 * /api/v1/users/profile:
 *   get:
 *     tags:
 *       - User
 *     summary: Get logged-in user profile
 *     description: Fetches the profile details of the currently authenticated user (Driver or Rider).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "User profile fetched successfully."
 *               data:
 *                 _id: "66ef0c7892adf92b1c33ab1a"
 *                 fullName: "John Fofie"
 *                 userName: "john_fofie"
 *                 email: "john.fofie@example.com"
 *                 studentStatus: "Student"
 *       401:
 *         description: Unauthorized access.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Unauthorized access."
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "User not found."
 */
router.get("/profile", authenticate, authorizedRoles("Driver", "Rider"), getUserProfile);

router.put("/change-password", authenticate, authorizedRoles("Driver", "Rider"), changePassword);

router.put("/change-username", authenticate, authorizedRoles("Driver", "Rider"), changeUsername);

router.put("/change-email", authenticate, authorizedRoles ("Driver, Rider"), changeEmail);


router.delete("/delete", authenticate, authorizedRoles("Driver", "Rider"), deleteAccount);

export default router;
