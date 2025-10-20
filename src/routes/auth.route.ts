import express from "express";
const router = express.Router();
import {register, login,} from "../controllers/auth.controllers.ts";
import { authenticate } from "../middlewares/auth.middleware.ts";
import { authorizedRoles } from "../middlewares/rbac.middleware.ts";



/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Sign Up User
 *     description: Creates a new user account with a hashed password. If the email already exists and the account was deleted, it restores the account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - userName
 *               - studentStatus
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       200:
 *         description: Account restored successfully
 *       400:
 *         description: Bad Request - missing fields or user already exists
 *       500:
 *         description: Internal Server Error
 */
//@route POST /api/v1/auth/register
//@desc Creates a new user
//@access public
router.post('/register', register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Log In User
 *     description: Authenticates a user and returns a JWT access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jane.doe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "SecurePass123!"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 accessToken:
 *                   type: string
 *                 data:
 *                   type: object
 *                   description: User profile (excluding password)
 *       400:
 *         description: Invalid credentials or missing fields
 *       404:
 *         description: Account has been deleted
 *       500:
 *         description: Internal Server Error
 */
//@route POST /api/v1/auth/login
//@desc Login a user
//@access public
router.post('/login',authenticate,authorizedRoles("Driver, Rider"), login);

export default router;