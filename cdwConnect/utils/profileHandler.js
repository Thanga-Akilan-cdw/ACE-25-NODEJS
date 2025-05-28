import { getDB } from "./db.js";

export const createNewProfile = async (data) => {
    const database = await getDB();
    await database.collection('profiles').insertOne(data);
}

export const fetchProfileDataFromDB = async (employeeID) => {
    const database = await getDB();
    const profile = await database.collection('profiles').find({employeeID});
    return profile;
}