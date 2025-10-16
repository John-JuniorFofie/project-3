import type {Request, Response} from "express";
import userSchema from "../models/user.model.ts"
import {AuthRequest} from '../types/authRequest'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

//JWT secret 
const {ACCESS_TOKEN_SECRET} = process.env;

//create account
//@desc create new user
//@route POST /api/users/register
//@access public

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
//Input validation
if(!name || email || password || role || phoneNumber){
    res.status(400).json({
        success:false,
        message:"fill all required fields"
    });
}
//check for existing user
const existingUser = await User.findOne

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
export const logIn = async  (req:Request, res:Response)=>{
    try{
        const {name, role, phoneNumber}= req.body;
        if(!name || !role|| !phoneNumber|| ){
            res.status(500).json({
                success:false,
                message:"please provide the correct credentials"
            })
        } 
    }
}

