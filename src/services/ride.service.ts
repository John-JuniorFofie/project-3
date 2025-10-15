import Ride from "../models/ride.model.ts";
import createHttpError from "http-errors";


export const createRide = async (riderId: string, data: any) => {
const ride = await Ride.create({
rider: riderId,
pickup: data.pickup,
dropoff: data.dropoff,
notes: data.notes,
status: "REQUESTED",
requestedAt: new Date()
});
return ride;
};


export const acceptRide = async (rideId: string, driverId: string) => {
const ride = await Ride.findById(rideId);
if (!ride) throw createHttpError(404, "Ride not found");
if (ride.status !== "REQUESTED") throw createHttpError(400, "Ride not available");
ride.driver = driverId as any;
ride.status = "ACCEPTED" as any;
ride.acceptedAt = new Date();
await ride.save();
return ride;
};


export const completeRide = async (rideId: string, driverId: string) => {
const ride = await Ride.findById(rideId);
if (!ride) throw createHttpError(404, "Ride not found");
if (ride.driver?.toString() !== driverId) throw createHttpError(403, "Not your ride");
ride.status = "COMPLETED" as any;
ride.completedAt = new Date();
await ride.save();
return ride;
};