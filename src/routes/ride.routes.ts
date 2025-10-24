import { Router } from "express";
import {
  requestRide,
  acceptRide,
  startRide,
  completeRide,
  cancelRide,
  getRideHistory,
} from "../controllers/ride.controllers.ts";
import { authenticate } from "../middlewares/auth.middleware.ts";
import { authorizedRoles } from "../middlewares/rbac.middleware.ts";


const router = Router();

/**
 * @swagger
 * tags:
 *   name: Rides
 *   description: Ride management for Drivers and Riders
 */

/**
 * @swagger
 * /api/v1/rides/request:
 *   post:
 *     tags:
 *       - Rides
 *     summary: Request a ride
 *     description: Allows a Rider to request a new ride by providing pickup and drop-off details.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pickupLocation
 *               - dropoffLocation
 *             properties:
 *               pickupLocation:
 *                 type: string
 *                 example: "Kwame Nkrumah Circle, Accra"
 *               dropoffLocation:
 *                 type: string
 *                 example: "University of Ghana, Legon"
 *               notes:
 *                 type: string
 *                 example: "Please hurry, I’m running late for class."
 *     responses:
 *       201:
 *         description: Ride request created successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Ride requested successfully."
 *               data:
 *                 rideId: "670a3f5c4b9e3a001c23af10"
 *                 status: "pending"
 *                 pickupLocation: "Kwame Nkrumah Circle"
 *                 dropoffLocation: "University of Ghana"
 *       400:
 *         description: Missing required fields.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 */
router.post("/request", authenticate,authorizedRoles("Rider"), requestRide);
/**
 * @swagger
 * /api/v1/rides/{id}/accept:
 *   patch:
 *     tags:
 *       - Rides
 *     summary: Accept a ride request
 *     description: Allows a Driver to accept a pending ride request.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ride ID
 *         schema:
 *           type: string
 *           example: "670a3f5c4b9e3a001c23af10"
 *     responses:
 *       200:
 *         description: Ride accepted successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Ride accepted successfully."
 *               data:
 *                 status: "accepted"
 *                 driverId: "66ef0c7892adf92b1c33ab1a"
 *       400:
 *         description: Ride already accepted or invalid state.
 *       401:
 *         description: Unauthorized access.
 *       404:
 *         description: Ride not found.
 */


router.patch("/:id/accept",authenticate,authorizedRoles("Driver"), acceptRide);

/**
 * @swagger
 * /api/v1/rides/{id}/start:
 *   patch:
 *     tags:
 *       - Rides
 *     summary: Start a ride
 *     description: Allows a Driver to start the ride once the Rider has been picked up.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ride ID
 *         schema:
 *           type: string
 *           example: "670a3f5c4b9e3a001c23af10"
 *     responses:
 *       200:
 *         description: Ride started successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Ride started."
 *               data:
 *                 status: "in-progress"
 *       400:
 *         description: Ride not accepted yet.
 *       401:
 *         description: Unauthorized access.
 *       404:
 *         description: Ride not found.
 */
router.patch("/:id/start",authenticate,authorizedRoles("Driver"), startRide);
/**
 * @swagger
 * /api/v1/rides/{id}/complete:
 *   patch:
 *     tags:
 *       - Rides
 *     summary: Complete a ride
 *     description: Allows a Driver to mark a ride as completed once the Rider is dropped off.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ride ID
 *         schema:
 *           type: string
 *           example: "670a3f5c4b9e3a001c23af10"
 *     responses:
 *       200:
 *         description: Ride completed successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Ride completed successfully."
 *               data:
 *                 status: "completed"
 *                 fare: 25.50
 *       400:
 *         description: Ride not started yet or already completed.
 *       401:
 *         description: Unauthorized access.
 *       404:
 *         description: Ride not found.
 */
router.patch("/:id/complete",authenticate,authorizedRoles("Driver"), completeRide);
/**
 * @swagger
 * /api/v1/rides/{id}/cancel:
 *   patch:
 *     tags:
 *       - Rides
 *     summary: Cancel a ride
 *     description: Allows either the Driver or Rider to cancel a ride before it’s completed.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ride ID
 *         schema:
 *           type: string
 *           example: "670a3f5c4b9e3a001c23af10"
 *     responses:
 *       200:
 *         description: Ride cancelled successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Ride cancelled successfully."
 *               data:
 *                 status: "cancelled"
 *       400:
 *         description: Cannot cancel completed ride.
 *       401:
 *         description: Unauthorized access.
 *       404:
 *         description: Ride not found.
 */
router.patch("/:id/cancel",authenticate,authorizedRoles("Driver,Rider"), cancelRide);

/**
 * @swagger
 * /api/v1/rides/{id}/history:
 *   get:
 *     tags:
 *       - Rides
 *     summary: Get ride history
 *     description: Fetches the history of a ride by its ID for either the Rider or Driver.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ride ID
 *         schema:
 *           type: string
 *           example: "670a3f5c4b9e3a001c23af10"
 *     responses:
 *       200:
 *         description: Ride history fetched successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Ride history fetched successfully."
 *               data:
 *                 rideId: "670a3f5c4b9e3a001c23af10"
 *                 status: "completed"
 *                 pickupLocation: "Accra Mall"
 *                 dropoffLocation: "Legon Campus"
 *                 fare: 30.0
 *                 date: "2025-10-14T09:30:00Z"
 *       401:
 *         description: Unauthorized access.
 *       404:
 *         description: Ride not found.
 */
router.get("/:id/history",authenticate,authorizedRoles("Driver,Rider"), getRideHistory);
export default router;
