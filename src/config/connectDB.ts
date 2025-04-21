import mongoose from "mongoose";

export const connectDB = () => {
    mongoose
        .connect("mongodb://admin:qwerty@localhost:27017/MyContainer?authSource=admin")
        .then(()=>console.log("Connected to MyContainer!"))
        .catch(()=>console.log("Error connecting to MyContainer!"))
}