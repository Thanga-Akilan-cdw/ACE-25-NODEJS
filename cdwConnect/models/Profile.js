import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
    employeeID: Number,
    name: String,
    gender: String,
    profilePic: String,
    designation: String,
    certifications: [{name: String, skill: String, dateOfCompletion: Date}],
    experience: Number,
    bu: String,
    workLocation: String
})

export const Profile = mongoose.model("Profile", profileSchema);