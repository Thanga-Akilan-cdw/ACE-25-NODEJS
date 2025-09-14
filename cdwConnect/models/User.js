import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    employeeID: Number,
    username: String,
    email: String,
    password: String,
    joinedOn: Date,
    role: String,
    status: String
})

userSchema.index({username: "text", designation: "text"})

export const User = mongoose.model("User", userSchema);