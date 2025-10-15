import { Router } from "express";
import {
  requestRide,
  acceptRide,
  completeRide,
  cancelRide,
} from "../controllers/ride.controllers.ts";

const router = Router();

// Rider requests a new ride
router.post("/request", requestRide);

// Driver accepts ride
router.patch("/:id/accept", acceptRide);

// Driver completes ride
router.patch("/:id/complete", completeRide);

// Rider cancels ride
router.patch("/:id/cancel", cancelRide);

export default router;
