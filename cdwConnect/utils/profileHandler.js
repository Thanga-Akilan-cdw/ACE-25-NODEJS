import { dbLogger } from "../logger/index.js";
import { Profile } from "../models/Profile.js";

export const createNewProfile = async (data) => {
    const {employeeID} = data;
    const profile = await Profile.findOne({employeeID});
    if(profile){
        throw new Error("Profile exists Already")
    }
    await Profile.insertOne(data);
    dbLogger.info(`Added new Profile for employee ${employeeID}`)
}

export const fetchProfileDataFromDB = async (employeeID) => {
    const profile = await Profile.findOne({});
    dbLogger.info(`Fetched profile of user ${employeeID}`)
    return profile;
}