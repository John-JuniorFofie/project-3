import mongoose, { Document, Model, Schema } from "mongoose";

export type Role = "rider" | "driver";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: Role;
    phoneNumber?:String;
    isAvaialable?: boolean; // For drivers
    currentLocatoin?:{
        type: "Point";
        coordinates: [number, number]; // [longitude, latitude]
    };
    }

const userSchema =new Schema<IUser>({
    name:{
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
    currentLocatoin:{
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
    },
    coordinates:{
        type:[Number], index:"2dsphere"}
    }
},{timestamps:true});
export default mongoose.model<IUser>("User", userSchema);
