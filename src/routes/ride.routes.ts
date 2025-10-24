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
 *   name: Ride
 *   description: API endpoints for ride
 */

/**
 * @swagger
 * /api/v1/user/request:
 *   post:
 *     tags:
 *       - Ride
 *     summary: request a ride
 *     description: user request a ride by providing the pickup and dropoff location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pickup
 *               - dropoff
 *             properties:
 *               pickup:
 *                 type: string
 *                  example: "john_fofie"
 *               dropoff:
 *                 type: string
 *                  example: "john_fofie"
 *     responses:
 *   
 *       200:
 *         description: requested  ride.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Ride requested successfully."
 *       401:
 *         description:pickup and dropoff required .
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "unauthorized user."
 *        404:
 *         description: couldn't load user.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "user not found ."
 *       500:
 *         description: couldn't request ride.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal Server Error"
 */
router.post("/request", authenticate,authorizedRoles("Rider"), requestRide);


/**
 * @swagger
 * /api/v1/user/accept:
 *   post:
 *     tags:
 *       - Ride
 *     summary: accept a ride
 *     description: driver accept a ride by providing the pickup and dropoff location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pickup
 *               - dropoff
 *             properties:
 *               pickup:
 *                 type: string
 *                  example: "john_fofie"
 *               dropoff:
 *                 type: string
 *                  example: "john_fofie"
 *     responses:
 *   
 *       200:
 *         description: accepted  ride.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Ride accepted successfully."
 *       401:
 *         description:pickup and dropoff required .
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "unauthorized user."
 *        404:
 *         description: couldn't load user.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "user not found ."
 *       500:
 *         description: couldn't request ride.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal Server Error"
 */
router.patch("/:id/accept",authenticate,authorizedRoles("Driver"), acceptRide);

/**
 * @swagger
 * /api/v1/user/request:
 *   post:
 *     tags:
 *       - Ride
 *     summary: start a ride
 *     description: Driver start a ride by providing the rideId and the userid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - UserId
 *               - RideId
 *               - Role
 *             properties:
 *               userId:
 *                 type: string
 *                  example: "12y3di4r83984rh449r9y484785"
 *               RideId:
 *                 type: string
 *                  example: "12y3di4r83984rh449r9y484785"
 *               Role: 
 *               type: string,
 *                example: "Driver"
 *     responses:
 *   
 *       200:
 *         description: started ride.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Ride requested successfully."
 *       401:
 *         description:RideId  required .
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "unauthorized user."
 *        404:
 *         description: couldn't load user.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "user not found ."
 *       500:
 *         description: couldn't request ride.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal Server Error"
 */
router.patch("/:id/start",authenticate,authorizedRoles("Driver"),startRide);
/**
 * @swagger
 * /api/v1/user/accept:
 *   post:
 *     tags:
 *       - Ride
 *     summary: accept a ride
 *     description: driver accept a ride by providing the pickup and dropoff location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pickup
 *               - dropoff
 *             properties:
 *               pickup:
 *                 type: string
 *                  example: "john_fofie"
 *               dropoff:
 *                 type: string
 *                  example: "john_fofie"
 *     responses:
 *   
 *       200:
 *         description: accepted  ride.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Ride accepted successfully."
 *       401:
 *         description:pickup and dropoff required .
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "unauthorized user."
 *        404:
 *         description: couldn't load user.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "user not found ."
 *       500:
 *         description: couldn't request ride.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal Server Error"
 */
router.patch("/:id/accept",authenticate,authorizedRoles("Driver"), acceptRide);

/**
 * @swagger
 * /api/v1/user/complete:
 *   post:
 *     tags:
 *       - Ride
 *     summary: complete a ride
 *     description: Driver end a ride by providing the rideId and the userid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - UserId
 *               - RideId
 *               - Role
 *             properties:
 *               userId:
 *                 type: string
 *                  example: "12y3di4r83984rh449r9y484785"
 *               RideId:
 *                 type: string
 *                  example: "12y3di4r83984rh449r9y484785"
 *               Role: 
 *               type: string,
 *                example: "Driver"
 *     responses:
 *   
 *       200:
 *         description: completed ride.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Ride completed successfully."
 *       401:
 *         description:RideId  required .
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "unauthorized user."
 *        404:
 *         description: couldn't load ride.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "user not found ."
 *       500:
 *         description: couldn't complete ride.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal Server Error"
 */

router.patch("/:id/complete",authenticate,authorizedRoles("Driver"), completeRide);


/**
 * @swagger
 * /api/v1/user/accept:
 *   post:
 *     tags:
 *       - Ride
 *     summary: accept a ride
 *     description: driver accept a ride by providing the pickup and dropoff location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pickup
 *               - dropoff
 *             properties:
 *               pickup:
 *                 type: string
 *                  example: "john_fofie"
 *               dropoff:
 *                 type: string
 *                  example: "john_fofie"
 *     responses:
 *   
 *       200:
 *         description: accepted  ride.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Ride accepted successfully."
 *       401:
 *         description:pickup and dropoff required .
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "unauthorized user."
 *        404:
 *         description: couldn't load user.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "user not found ."
 *       500:
 *         description: couldn't request ride.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal Server Error"
 */
router.patch("/:id/accept",authenticate,authorizedRoles("Driver"), acceptRide);

/**
 * @swagger
 * /api/v1/user/cancel:
 *   post:
 *     tags:
 *       - Ride
 *     summary: cancela ride
 *     description: User cancels a ride by providing the rideId and the userid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - UserId
 *               - RideId
 *               - Role
 *             properties:
 *               userId:
 *                 type: string
 *                  example: "12y3di4r83984rh449r9y484785"
 *               RideId:
 *                 type: string
 *                  example: "12y3di4r83984rh449r9y484785"
 *               Role: 
 *               type: string,
 *                example: "Driver, Rider"
 *     responses:
 *   
 *       200:
 *         description: cancelled ride.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Ride cancelled successfully."
 *       401:
 *         description:RideId  required .
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "unauthorized user."
 *        404:
 *         description: couldn't load user.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "user not found ."
 *       500:
 *         description: couldn't request ride.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal Server Error"
 */
router.patch("/:id/cancel",authenticate,authorizedRoles("Driver,Rider"), cancelRide);

/**
 * @swagger
 * /api/v1/user/accept:
 *   post:
 *     tags:
 *       - Ride
 *     summary: accept a ride
 *     description: driver accept a ride by providing the pickup and dropoff location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pickup
 *               - dropoff
 *             properties:
 *               pickup:
 *                 type: string
 *                  example: "john_fofie"
 *               dropoff:
 *                 type: string
 *                  example: "john_fofie"
 *     responses:
 *   
 *       200:
 *         description: accepted  ride.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Ride accepted successfully."
 *       401:
 *         description:pickup and dropoff required .
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "unauthorized user."
 *        404:
 *         description: couldn't load user.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "user not found ."
 *       500:
 *         description: couldn't request ride.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal Server Error"
 */
router.patch("/:id/accept",authenticate,authorizedRoles("Driver"), acceptRide);

/**
 * @swagger
 * /api/v1/user/history:
 *   post:
 *     tags:
 *       - Ride
 *     summary: fetch ride history
 *     description: user fetched a ride history by providing the UserId and Role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - UserId
 *               - RideId
 *               - Role
 *             properties:
 *               userId:
 *                 type: string
 *                  example: "12y3di4r83984rh449r9y484785"
 *               Role: 
 *               type: string,
 *                example: "Driver"
 *     responses:
 *   
 *       200:
 *         description: fetched ride history.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Ride history fetched successfully."
 *       401:
 *         description:userId and Role required.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "unauthorized user."
 *        404:
 *         description: couldn't load user.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "user not found ."
 *       500:
 *         description: couldn't load ride history.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal Server Error"
 */
router.get("/:id/history",authenticate,authorizedRoles("Driver,Rider"), getRideHistory);
export default router;
