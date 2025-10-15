import type {Request, Response} from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import {User} from '../models/user.model.ts'
import generateOTP from '../Utils/OTP';
import OTPverification from '../models/OTPverification..model';
import {CustomJwtPayload} from '../types/authRequest';
import {SendEmail} from '../Utils/email.transporter';

require ('dotenv').config();


