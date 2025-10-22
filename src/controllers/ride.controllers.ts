import type { Response, NextFunction } from "express";
import { Ride } from "../models/ride.model.ts";
import type { AuthRequest } from "../types/authRequest.ts";
import mongoose from "mongoose";

// Request a ride
export const requestRide = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { pickup, dropoff } = req.body;
    const userId = req.user?.userId;
       if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    if (!pickup || !dropoff) {
      return res.status(400).json({
        success: false,
        message: "pickup and dropoff are required",
      });
    }

 
    const ride = await Ride.create({
      pickup: pickup,
      dropoff: dropoff,
      rider: userId,
    });

    res.status(201).json({
      success: true,
      message: "Ride requested successfully.",
      data: ride,
    });
  } catch (error) {
    console.error({ message: "Error requesting ride", error });
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Accept a ride
export const acceptRide = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const rideId = req.params.id;
    const userId = req.user?.userId;
       
    if (!userId) {
       res.status(401).json({
        success: false,
        message: "Unauthorized user",
      }); return;
    }

    if (!rideId || !userId) {
      res.status(400).json({
         success: false, 
         message: "Provide RideId and UserId" });
      return;
    }

    const ride = await Ride.findById(rideId);
    if (!ride) {
      res.status(404).json({
         success: false, message: "Ride not found" });
      return;
    }

    ride.status = "accepted";
    ride.driver = new mongoose.Types.ObjectId(userId);
    await ride.save();

    res.status(200).json({
      success: true,
      message: "Ride accepted successfully",
      data: ride,
    });
  } catch (error) {
    console.error({ message: "Error accepting ride", error });
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Complete a ride
export const completeRide = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const rideId = req.params.id;
    const userId = req.user?.userId;
    
        if (!userId) {
       res.status(401).json({
        success: false,
        message: "Unauthorized user provide UserId",
      }); return;
    }

    // if (!rideId || !userId) {
    //   res.status(400).json({
    //      success: false, 
    //      message: "Provide RideId and UserId" });
    //   return;
    // }

    const ride = await Ride.findById(rideId);
    if (!ride || ride.status !== "in_progress") {
      res.status(404).json({
        success: false,
        message: "Ride not in progress. Please start a ride first.",
      });
      return;
    }

    ride.status = "completed";
    await ride.save();

    res.status(200).json({
      success: true,
      message: "Ride completed successfully",
      data: ride,
    });
  } catch (error) {
    console.error({ message: "Error finishing ride", error });
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Cancel a ride
export const cancelRide = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const rideId = req.params.id;
    const userId = req.user?.userId;

         if (!userId) {
       res.status(401).json({
        success: false,
        message: "Unauthorized user provide UserId",
      }); return;
    }
    // if (!rideId || !userId) {
    //   res.status(400).json({ success: false, message: "Provide RideId and UserId" });
    //   return;
    // }

    const ride = await Ride.findById(rideId);
    if (!ride) {
      res.status(404).json({ success: false, message: "Ride not found" });
      return;
    }

    if (ride.status === "completed" || ride.status === "cancelled") {
      res.status(400).json({
        success: false,
        message: `Cannot cancel a ride that is already ${ride.status}`,
      });
      return;
    }

    if (ride.rider.toString() !== userId && ride.driver?.toString() !== userId) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to cancel this ride",
      });
      return;
    }

    ride.status = "cancelled";
    ride.updatedAt = new Date();
    await ride.save();

    res.status(200).json({
      success: true,
      message: "Ride cancelled successfully",
      data: ride,
    });
  } catch (error) {
    console.error({ message: "Error cancelling ride", error });
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Get ride history
export const getRideHistory = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    const userRole = req.user?.role;

    if (!userId || !userRole) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const rides =
      userRole === "rider"
        ? await Ride.find({ rider: userId }).sort({ createdAt: -1 })
        : await Ride.find({ driver: userId }).sort({ createdAt: -1 });

    if (!rides.length) {
      return res.status(404).json({
        success: false,
        message: "No ride history found",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Ride history fetched successfully",
      data: rides,
    });
  } catch (error) {
    console.error("Error fetching ride history:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
