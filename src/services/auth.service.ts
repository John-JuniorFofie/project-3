    import User, { IUser } from "../models/user.model.ts";
    import bcrypt from "bcrypt";
    import jwt from "jsonwebtoken";
    import createHttpError from "http-errors";


    const JWT_SECRET = process.env.JWT_SECRET as string;
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;



    export const createUser = async (name: string, email: string, password: string, role: string) => {
        const existing = await User.findOne({ email });
        if (existing) throw createHttpError(409, "Email already in use");
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, passwordHash: hash, role });
        return user;
    };


    export const authenticate = async (email: string, password: string) => {
    const user = await User.findOne({ email });
        if (!user) throw createHttpError(401, "Invalid credentials");
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) throw createHttpError(401, "Invalid credentials");
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        return { user, token };
    };