import type {Request, Response} from 'express';
import {Ride} from '../models/ride.model.ts';
import type{AuthRequest} from "../types/authRequest.ts";
import {Schema, Types} from 'mongoose';


 export const requestRide = async (req: Request, res: Response, next: Function) => {
    try {
     const {pickuplocation, dropofflocation} = req.body;
     const userId = req.user?.userId;

     if (!pickuplocation  || dropofflocation){
      res.status(400).json({
        success:false,
        message:"pickuplocation and dropofflocation are required"
      });
      return;
     }
     const ride = await Ride.create(
      {
        pickupLocation:pickuplocation,
        dropOffLocation: dropofflocation,
        rider:userId,
      }
     )
     res.status(200).json({
      success:true,
      message:"Ride requested successfully.",
      data:ride
     })
    }catch (error){
      console.log({message: "Error requesting ride", error});
      res.status(500).json({success:false, error: "internal server error"})
    }
    }

//@route PATCH /api/vi/rides6/:qid/accept
//@desc Driver accepts ride (driver only), 
//@access Private 
export const acceptRide = async (req: AuthRequest, res: Response):Promise<void> => {
    try {
        const rideId = req.params.id;
        const UserId = req .user?.id;
        

        if(!rideId || !UserId){
          res.status(400).json({
            success:false,
            message: "provide RideId and UserId"
          });
          return;
        }
        rideId.status = "accepted";
        Ride.driver = UserId as any;
        await Ride.save();

        res.status(200).json({
          success:true,
          message:"Ride accepted successfully",
          data:Ride
        })
        
    }catch(error){
      console.log({
        message:"Error accepting ride", error
      })
      res.status(500).json({
        success:false,
        error:"Internal server error"
      })
      return;
    }
    };

//@route PATCH /api/v1/rides'/:/start
//@desc... driver end/complete (driver only)
//@Acess Private


export const completeRide = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const rideId = req.params.id;
    const userId = req.user?.id;
    
    if (!rideId || !userId)
      res.status(401).json({ 
        success:false,
        message: "Provide RideId and UserId" 
      });

    const ride = await Ride.findId(rideId);
    if(!ride || !ride.status !== "in_progress"){
      res.status(404).json({
        success:false,
        message:"Ride not in progress please start a ride first."
      });
      return;
    }
    ride.status ='completed';
     await ride.save();


    res.status(200).json({ 
      success:true,
      message: "Ride completed successfully", 
      data: ride 
    });
   
  } catch (error) {
    console.log({message:"Error finishing ride", error});
    res.status(500).json({
      success:false,
      error: "internal servre Rrror"
    });
    return;
  }
};

//cancel ride
 //@route PATCH /api/v1/rides'/:/cancel
//@desc... users can cancel the ride
//@Acess Public

export const cancelRide = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const rideId = req.params.id;
    const userId = req.user?.id;

    if (!rideId || !userId) {
      res.status(401).json({
        success: false,
        message: "Provide RideId and UserId",
      });
      return;
    }

    const ride = await Ride.findById(rideId);

    if (!ride) {
      res.status(404).json({
        success: false,
        message: "Ride not found",
      });
      return;
    }

    //  Check if ride is already completed or cancelled
    if (ride.status === "completed" || ride.status === "cancelled") {
      res.status(400).json({
        success: false,
        message: `Cannot cancel a ride that is already ${ride.status}`,
      });
      return;
    }

    //  Allow only rider or driver who created the ride to cancel
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
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

  //get ridehistory
 //@route PATCH /api/v1/rides'/:/cancel
//@desc... users check ride history
// //@Acess Public
export const getRideHistory = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const userRole = req.user?.role; // assuming your JWT contains a "role" like 'driver' or 'rider'

    if (!userId || !userRole) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    // Check role and fetch rides
    let rides;
    if (userRole === "rider") {
      rides = await Ride.find({ rider: userId }).sort({ createdAt: -1 });
    } else if (userRole === "driver") {
      rides = await Ride.find({ driver: userId }).sort({ createdAt: -1 });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid user role",
      });
    }

    if (!rides || rides.length === 0) {
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

    