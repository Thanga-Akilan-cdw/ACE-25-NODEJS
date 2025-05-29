import { Profile } from "../models/Profile.js";

export const createNewProfile = async (data) => {
    const {employeeID} = data;
    const profile = await Profile.findOne({employeeID});
    if(profile){
        throw new Error("Profile exists Already")
    }
    await Profile.insertOne(data);
}

export const fetchProfileDataFromDB = async (employeeID) => {
    const profile = await Profile.findOne({});
    console.log(employeeID )
    return profile;
}