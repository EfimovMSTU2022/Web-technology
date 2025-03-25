import express, {Request, Response} from "express";
import mongoose from "mongoose";
import User from "./models/User";

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

mongoose
    .connect("mongodb://admin:qwerty@localhost:27017/MyContainer?authSource=admin")
    .then(()=>console.log("Connected to MyContainer!"))
    .catch(()=>console.log("Error connecting to MyContainer!"))

app.get('/get-users', async (req: Request, res: Response) => {
    try {
        const users = await User.find()
        res.status(202).json(users)
    } catch (e) {
        res.status(400).json({message: (e as Error).message})
    }
})

app.post('/post-users', async (req: Request, res: Response) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).json(user)
    } catch (e) {
        res.status(400).json({message: (e as Error).message})
    }
})

app.delete('/delete-user/:username', async (req: Request, res: Response) => {
    const { username } = req.params; //username из тела запроса

    try {
        const result = await User.deleteOne({ username });
        if (result.deletedCount === 0) {
            res.status(404).json({message:"User not found"})
        }
        res.status(202).json("User deleted");
    } catch (e) {
        res.status(400).json({ message: (e as Error).message });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})