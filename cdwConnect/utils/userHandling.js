import { User } from "../models/User.js";
import { sendMail } from "./sendMail.js";
import { authLogger } from "../logger/index.js";

export const getUser = async ({username, employeeID, email, role}) => {
    const query = [];
    if (username != undefined) query.push({username});
    if (employeeID !== undefined) query.push({employeeID: parseInt(employeeID)});
    if (email != undefined)  query.push({email});
    if (role != undefined)  query.push({role});
    const user = await User.findOne({
        $or: query
    });
    authLogger.info(`Fetched user ${employeeID}`)
    return user
}


export const getUsers = async ({status}) => {
    const users = await User.find({status}).toArray();
    return users;
}

export const insertUserToUsersDB = async (username, email, employeeID, password, role, status) => {
    const joinedOn = new Date();
    await User.insertOne({username, email, employeeID, password, joinedOn, role, status});
    authLogger.info(`Inserted User ${employeeID} to collection`)
}


export const updateUser = async (filter, data) => {
    await User.updateOne(filter, { $set: data});
    authLogger.info(`Updated user based on ${filter}`)
}

export const updateUserStatus = async (employeeID, status) => {
    const filter = {
        employeeID: parseInt(employeeID)
    }
    const updateFields = {status};
    if(status == "rejected"){
        updateFields.rejectedOn = new Date();
    }
    await User.updateOne(filter, {$set: updateFields});
    const {email} = await getUser({employeeID});
    await sendMail(email, status);
    authLogger.info(`Updates user ${employeeID} status `)
}
