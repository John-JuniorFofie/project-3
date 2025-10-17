import type {Request, Response} from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import {User} from '../models/user.model.ts'
import generateOTP from '../Utils/OTP';
import OTPverification from '../models/OTPverification..model';
import type{CustomJwtPayload} from '../types/authRequest.ts';
import type{SendEmail} from '../Utils/email.transporter.ts';

require ('dotenv').config();

//JWT 
const {ACCESS_TOKEN_SECRET} = process.env;

if(!ACCESS_TOKEN_SECRET)
//{
//     throw new Error("ACCESS_TOKEN_SECRET is not defined in .env")

// }

//@route POST/api/vi/auth/signUp
//@desc Sign Up user (create user and hash password)
//@acces public 


export const register = async (req: Request, res:Response): promise<void> =>{
    try{
        const {
            fullName,
            email,
            password,
            role,
            isAccountDeleted
        } = req.body;
    }
}


