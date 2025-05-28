import { getDB } from "./db.js"
import { sendMail } from "./sendMail.js";

export const getUser = async ({username, employeeID, email, role}) => {
    const query = {};
    const database = await getDB();
    if (username != undefined) query.username = username;
    if (employeeID !== undefined) query.employeeID = parseInt(employeeID);
    if (email != undefined) query.email = email;
    if (role != undefined) query.role = role;
    const user = await database.collection("users").findOne(query);
    return user
}


export const getUsers = async ({status}) => {
    const database = await getDB();
    const users = database.collection('users').find({status}).toArray();
    return users;
}

export const insertUserToUsersDB = async (username, email, employeeID, password, role, status) => {
    const database = await getDB();
    const joinedOn = new Date();
    await database.collection('users').insertOne({username, email, employeeID, password, joinedOn, role, status});
}


export const updateUser = async (filter, data) => {
    const database = await getDB();
    await database.collection('users').updateOne(filter, { $set: data});
}

export const updateUserStatus = async (employeeID, status) => {
    const database = await getDB();
    const filter = {
        employeeID: parseInt(employeeID)
    }
    const updateFields = {status};
    if(status == "rejected"){
        updateFields.rejectedOn = new Date();
    }
    await database.collection('users').updateOne(filter, {$set: updateFields});
    const {email} = await getUser({employeeID});
    await sendMail(email, status);
}
