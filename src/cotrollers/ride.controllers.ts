import type { Request, Response, NextFunction } from "express";
import { requestRideSchema } from "../schemas/ride.schema";
import  rideService from "../services/ride.service";


 export const requestRide = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = requestRideSchema.parse(req.body);
        const riderId = (req as any).user?.id;
        if (!riderId)
        return res.status(401).json({ message: "Unauthorized" });
        const ride = await rideService.createRide(riderId, payload);
        res.status(201).json({ data: ride });
        } catch (err) {
        next(err);
    }
    };


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


    // export const completeRide;