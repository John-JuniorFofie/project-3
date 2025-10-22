import { Schema, model, Document,Types } from "mongoose";

import   type{RideStatus} from "../types/ride.types.ts";

export interface IRide extends Document {
    rider: Types.ObjectId;   
    driver?: Types.ObjectId | null;
     pickup: "String"; //{
//     type: "point";
//     coordinates: [number, number]; // [longitude, latitude]
//   }
  dropoff:"String"; //{ 
    // type: "point";
    // coordinates: [number, number]; // [longitude, latitude]
    //}
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

const RideSchema = new Schema<IRide>({
    rider:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index:true,

    },
    driver:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required:false,
        // default: null,
    },
    pickup: {
        // ...geoPoint,
        type:String,
        required: true,
    },
    dropoff: {
        // ...geoPoint,
        type:String,
        required: true,
    },
    status:{
        type:String,
        enum:["requested", "accepted", "completed", "cancelled","statusChecked","in_progress","history"],
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
},
{
    timestamps:true
}
);
// RideSchema.index({pickup:"2dsphere"});
// RideSchema.index({status:1, driver:1});

export const Ride = model<IRide>("Ride", RideSchema);