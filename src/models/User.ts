import mongoose from "mongoose";

export enum UserRoles {
    user="user",
    admin="admin",
    moderator="moderator",
}

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: UserRoles.user},
})

export default mongoose.model("User", UserSchema);
