import type {Request, Response} from 'express';
import {Ride} from '../models/ride.model.ts';
import {AuthRequest} from "../types/authRequest";
import {Schema, Types} from 'mongoose';


 export const requestRide = async (req: Request, res: Response, next: NextFunction) => {
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
export const acceptRide = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rideId = req.params.id;
        const driverId = (req as any).user?.id;
        const ride = await rideService.acceptRide(rideId, driverId);
        res.json({ data: ride });
        } catch (err) {
        next(err);
    }
    };
export const completeRide = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rideId = req.params.id;
    const driverId = (req as any).user?.id;
    if (!driverId)
      return res.status(401).json({ message: "Unauthorized" });

    const ride = await rideService.completeRide(rideId, driverId);
    res.json({ message: "Ride completed successfully", data: ride });
  } catch (err) {
    next(err);
  }
};
  export const cancelRide = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rideId = req.params.id;
    const riderId = (req as any).user?.id;
    if (!riderId)
      return res.status(401).json({ message: "Unauthorized" });

    const ride = await rideService.cancelRide(rideId, riderId);
    res.json({ message: "Ride cancelled successfully", data: ride });
  } catch (err) {
    next(err);
  }
};


    // export const completeRide;