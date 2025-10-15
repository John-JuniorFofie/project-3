import type {Request, Response} from "express";

import userSchema from "../models/user.model.ts"

//create account

    export const createAccount = async (req:Request, res:Response)=>{
    try{
    const {name, email, password, role, phoneNumber}= req.body;
    const newUser = new userSchema({
        name,
        email,
        password,
        role,
        phoneNumber
});
await newUser.save();

res.status(201).json({
    success:true,
    message:"User created successfully"
})
} catch (error){
    res.status(400).json({
        success:false,
        message:"failed to create user"
    })
}
};

//logIn User
export const loigIn = async  (req:Request, res:Response)=>{
    try{
        const {name, role, phoneNumber}= req.body;
        if(!name || !role|| !phoneNumber||){
            res.status(500).json({
                success:false,
                message:"please provide the correct credentials"
            })
        } 
    }
}

