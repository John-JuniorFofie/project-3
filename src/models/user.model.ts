import mongoose, { Document, Model, Schema } from "mongoose";
import {UserRole} from "../types/authRequest";

// export type Role = "rider" | "driver";


export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    role: UserRole;
    phoneNumber?:String;
    isAvaialable?: boolean; // For drivers
    // currentLocatoin?:{
    //     type: "Point";
    //     coordinates: [number, number]; // [longitude, latitude]
    // };
    }

const userSchema =new Schema<IUser>({
    fullName:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        select:false,
    },
    role:{
        type: String,
        enum: ["rider", "driver"],
        required: true,
    },
    phoneNumber:{
        type: String,
        required: false,
        trim: true,
    },
    isAvaialable:{
        type: Boolean,
        default: false,
    },
    // currentLocation:{
    //     type: {
    //         type: String,
    //         enum: ["Point"],
    //         default: "Point",
    // },
    // coordinates:{
    //     type:[Number], index:"2dsphere"}
    // }
},{timestamps:true});
export default mongoose.model<IUser>("User", userSchema);
