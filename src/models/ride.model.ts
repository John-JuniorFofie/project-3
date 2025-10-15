import mongoose, {Schema, Document,Model, Types, model} from "mongoose";

export type RideStatus = "requested" | "accepted" | "in_progress" | "completed" | "cancelled";

export type Ride = Document & {
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
        ...geoPoint,
        required: true,
    },
    dropoff: {
        ...geoPoint,
        required: true,

    },
    status:{
        type:String,
        enum:["requested", "accepted", "in_progress", "completed", "cancelled"],
        default: "requested",
    },
    fare:Number,
    notes: String,
    requestedAt:{
        type: Date,
        default: Date.now,
    },
    updatedAt: Date,
    completedAt:{ 
        type: Date, 
    },     
},{timestamps:true});
RideSchema.index({pickup:"2dsphere"});
RideSchema.index({status:1, driver:1});

export default model<Ride>("Ride", RideSchema);