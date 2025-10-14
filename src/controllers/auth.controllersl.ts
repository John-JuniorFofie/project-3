import type { Request, Response, NextFunction } from "express";
import { signupSchema, loginSchema } from "../schemas/auth.schema";
import * as authService from "../services/auth.service";


    export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const payload = signupSchema.parse(req.body);
    const user = await authService.createUser(payload.name, payload.email, payload.password, payload.role);
    res.status(201).json({ data: { id: user._id, email: user.email, role: user.role } });
    } catch (err) {
    next(err);
    }
    };


export const login = async (req: Request, res: Response, next: NextFunction) => {
try {
const payload = loginSchema.parse(req.body);
const { user, token } = await authService.authenticate(payload.email, payload.password);
res.json({ data: { id: user._id, email: user.email, role: user.role, token } });
} catch (err) {
next(err);
}
};