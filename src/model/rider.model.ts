import mongoose, {Schema, Document,Model} from "mongoose";

export type UserSchema = Document & {
  rider:Types.objectId;
  driver?: Types.objectId | null;
  pickup: {
    type: "point";
    coordinates: [number, number]; // [longitude, latitude]
  }






}