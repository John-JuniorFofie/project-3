import mongoose, {Schema, Document,Model, Types} from "mongoose";

export type RideStatus = "requested" | "accepted" | "in_progress" | "completed" | "cancelled";

export type Ride = Document & {
  fullName: string;
  email: string;
  phone: string;
    rider:Types.ObjectId;
  driver?: Types.ObjectId | null;
  pickup: {
    type: "point";
    coordinates: [number, number]; // [longitude, latitude]
  }
  dropoff: { 
    type: "point";
    coordinates: [number, number]; // [longitude, latitude]
    }
    status: RideStatus;
    fare?: number;
    notes?:string;
    requestedAt: Date;
    updatedAt?: Date;
    completedAt?: Date | null;
}
const geoPoint ={
    type: {
        type: String,
        enum: ["Point"],
        default: "Point",

    },
    coordinates: {
        type: [Number],
        required: true,
    }
};

const RideSchema: Schema<Ride> = new Schema({
    fullName:{
        type: String,
        required: true, 
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },

    rider:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    driver:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required:false,
        default: null,
    },
    pickup: {
    
})

