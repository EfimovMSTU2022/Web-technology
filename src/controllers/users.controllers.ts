import e, {Request, Response} from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/constants";

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).json(user)
    } catch (e) {
        res.status(400).json({message: (e as Error).message})
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find()
        res.status(202).json(users)
    } catch (e) {
        res.status(400).json({message: (e as Error).message})
    }
}

export const deleteUser = async (req: Request, res: Response) => {


    const { userId } = req.body; //userId из тела запроса

    try {
        const deletedUser = await User.findByIdAndDelete(userId)
        if (!deletedUser) {
            return res.status(404).json({message: 'No user with this id!'})
        }
        return res.status(202).send(deletedUser);
    } catch (e) {
        return res.status(400).json({ message: (e as Error).message });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { username, email } = req.body;

        // Валидация: хотя бы одно поле должно быть передано
        if (!username && !email) {
            return res.status(400).json({
                message: "Требуется username или email для обновления"
            });
        }

        // Обновляем пользователя и возвращаем обновленный документ ({ new: true })
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, email },
            { new: true, runValidators: true } // runValidators проверяет валидность данных
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        res.status(200).json(updatedUser);
    } catch (e) {
        res.status(400).json({ message: (e as Error).message });
    }
};
