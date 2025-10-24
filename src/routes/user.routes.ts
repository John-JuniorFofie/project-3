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
 *   name: user
 *   description: API endpoints for user updating the user details
 */

/**
 * @swagger
 * /api/v1/user/profile:
 *   post:
 *     tags:
 *       - User
 *     summary: update profile
 *     description: User can retrieve all details about him or her  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - userName
 *               - role
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "John fofie"
 *               userName:
 *                 type: string
 *                 example: "john_fofie"
 *             
 *                role:
 *                type: String,
 *                enum: "rider", "driver",
 *                required: true,
                   
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.fofie@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "SecurePass123!"
 *     responses:
 *   
 *       200:
 *         description: Profile fetched successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "User profile fetched successfully."
 *       401:
 *         description: Provide userId.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "unauthorized access ."
 *        404:
 *         description: couldn't load user.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "user not found ."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal Server Error"
 */
router.get("/profile", authenticate, authorizedRoles("Driver", "Rider"), getUserProfile);

/**
 * @swagger
 * /api/v1/user/change-password:
 *   post:
 *     tags:
 *       - User
 *     summary:get user profile
 *     description: user update password with new hashed password 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "SecurePass123!"
 *     responses:
 *   
 *       200:
 *         description: Password changed successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "password updated successfully."
 *       401:
 *         description:oldPassword doen't match .
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "unauthorized access."
 *        404:
 *         description: couldn't load user.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "user not found ."
 *       500:
 *         description: couldn't change password.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal Server Error"
 */
router.put("/change-password", authenticate, authorizedRoles("Driver", "Rider"), changePassword);

/**
 * @swagger
 * /api/v1/user/change-email:
 *   post:
 *     tags:
 *       - User
 *     summary: change email
 *     description: user update email with new email 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               password:
 *                 type: string
 *                 format: email
 *                  example: "john.fofie@example.com"
 *     responses:
 *   
 *       200:
 *         description: Password changed successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "email updated successfully."
 *       401:
 *         description:oldEmail doen't match .
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "unauthorized access."
 *        404:
 *         description: couldn't load user.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "user not found ."
 *       500:
 *         description: couldn't change email.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal Server Error"
 */
router.put("/change-email", authenticate, authorizedRoles ("Driver, Rider"), changeEmail);

/**
 * @swagger
 * /api/v1/user/change-password:
 *   post:
 *     tags:
 *       - User
 *     summary: change user password
 *     description: user update password with new hashed password 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "SecurePass123!"
 *     responses:
 *   
 *       200:
 *         description: Password changed successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "password updated successfully."
 *       401:
 *         description:oldPassword doen't match .
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "unauthorized access."
 *        404:
 *         description: couldn't load user.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "user not found ."
 *       500:
 *         description: couldn't change password.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal Server Error"
 */
router.put("/change-password", authenticate, authorizedRoles("Driver", "Rider"), changePassword);

/**
 * @swagger
 * /api/v1/user/change-name:
 *   post:
 *     tags:
 *       - User
 *     summary: change user name
 *     description: user update userName with userName
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *             properties:
 *               userName:
 *                 type: string
 *                  example: "john_fofie"
 *     responses:
 *   
 *       200:
 *         description: userName changed successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "userName updated successfully."
 *       401:
 *         description:oldUsername doen't match .
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "unauthorized access."
 *        404:
 *         description: couldn't load user.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "user not found ."
 *       500:
 *         description: couldn't change userName.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal Server Error"
 */
router.put("/change-name", authenticate, authorizedRoles ("Driver, Rider"), changeUsername);

/**
 * @swagger
 * /api/v1/user/delete:
 *   post:
 *     tags:
 *       - User
 *     summary: delete account
 *     description: user delete the profile from the database
 *     
 *     responses:
 *   
 *       200:
 *         description: user deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "user deleted successfully."
 *       401:
 *         description:oldUsername doen't match .
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "unauthorized access."
 *        404:
 *         description: couldn't load user.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "user not found ."
 *       500:
 *         description: Error.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal Server Error"
 */
router.delete("/delete", authenticate, authorizedRoles("Driver", "Rider"), deleteAccount);

export default router;
