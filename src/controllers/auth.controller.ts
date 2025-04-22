import e, { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

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
        res.status(200).json({message: "Login successful"});
        return;
    }
}

export const signUp = async (req: Request, res: Response) => {
    const {username, email, password} = req.body;

    const existingUser = await User.findOne({email});

    if (existingUser) {
        res.status(400).json({message: "User already exists"});
        return;
    }

   const encryptedPassword = await bcrypt.hash(password, 10);

    console.log("encryptedPassword", encryptedPassword, password);

    const user = new User({username, email, password: encryptedPassword});
    await user.save();
    res.status(201).json(user);
}