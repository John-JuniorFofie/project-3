import { Router } from "express";
import {
  requestRide,
  acceptRide,
  startRide,
  completeRide,
  cancelRide,
} from "../controllers/ride.controllers.ts";
import { authenticate } from "../middlewares/auth.middleware.ts";
import { authorizedRoles } from "../middlewares/rbac.middleware.ts";
import { start } from "repl";

const router = Router();

// Rider requests a new ride
router.post("/request", authenticate,authorizedRoles("Rider"), requestRide);

// Driver accepts ride
router.patch("/:id/accept",authenticate,authorizedRoles("Driver"), acceptRide);

//Driver starts ride
router.patch("/:id/start",authenticate,authorizedRoles("Driver"),startRide);

// Driver completes ride
router.patch("/:id/complete",authenticate,authorizedRoles("Driver"), completeRide);

// Rider cancels ride
router.patch("/:id/cancel",authenticate,authorizedRoles("Driver,Rider"), cancelRide);

export default router;
