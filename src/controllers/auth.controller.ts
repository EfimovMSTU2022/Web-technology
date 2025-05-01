import e, { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/constants";

export const signIn = async (req: Request, res: Response) => {
    const {username, password} = req.body;

    const existingUser = await User.findOne({username});

    if (!existingUser) {
        res.status(400).json({message: "Username or password is wrong."});
        return;
    }

    const result = await bcrypt.compare(password, existingUser.password);

    if (!result) {
        res.status(401).json({message: "Username or password is wrong."})
    } else {
        const userResponse = {username: existingUser.username, email: existingUser.email, role: existingUser.role};

        const token = jwt.sign(userResponse, JWT_SECRET);

        res.status(200).json({userResponse, token, message: "Signed-in successfully"});
        return;
    }
}

export const signUp = async (req: Request, res: Response) => {
    const {username, email, password, role} = req.body;

    const existingUser = await User.findOne({email});

    if (existingUser) {
        res.status(400).json({message: "User already exists"});
        return;
    }

   const encryptedPassword = await bcrypt.hash(password, 10);

    console.log("encryptedPassword", encryptedPassword, password);

    const user = new User({username, email, password: encryptedPassword, role });
    await user.save();

    const userResponse = {username: user.username, email: user.email, role: user.role};

    const token = jwt.sign(userResponse, JWT_SECRET);

    res.status(201).json({user, token, message: "Signed-up successfully"});
}