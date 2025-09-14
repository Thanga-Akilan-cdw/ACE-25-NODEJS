import { getUser, insertUserToUsersDB, updateUser } from "../utils/userHandling.js";
import { authLogger } from "../logger/index.js";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { generateHash } from "../../Listify/utils/generateHash.js";

dotenv.config();

export const signupUser = async (data) => {
    const { username, email, employeeID, password, role } = data;
    const hashedPassword = generateHash(password);
    if(!(employeeID && password && role && email)){
        const error = new Error("Credentials missing for Signup")
        error.statusCode = 400;
        throw error;
    }
    const user = await getUser({employeeID, email});
    const status = role=='admin'?"approved":"pending";
    if(user && user.status != "rejected"){
        const error = new Error("User Already Exists");
        error.statusCode = 409;
        throw error;
    }else if(user){
        if (user.rejectedOn) {
            const rejectedTime = new Date(user.rejectedOn).getTime();
            const now = Date.now();
            const hoursSinceRejection = (now - rejectedTime) / (1000 * 60 * 60);

            if (hoursSinceRejection < 48) {
                throw new Error("You must wait 48 hours after rejection to reapply.");
            }
        }
        await updateUser({employeeID}, {username, email, hashedPassword, role, status});
    }else{
        await insertUserToUsersDB(username, email, employeeID, hashedPassword, role, status);
    }
    authLogger.info(`Created User ${username} with status ${status}`); 
    return status;
}


export const signinUser = async (data) => {
    const { password, role, employeeID} = data;
    if(!(employeeID && password && role)){
        const error = new Error("Login Arguments missing");
        error.statusCode = 401;
        throw error;
    }
    const user = await getUser({employeeID});
    if(!user){
        const error = new Error("User not found for the Employee ID");
        error.statusCode = 404;
        throw error;
    }

    if(user.password != generateHash(password)){
        throw new Error("Incorrect Password")
    }
    if(user.role != role){
        throw new Error("Invalid role .")
    }
    if(user.status != "approved"){
        throw new Error(`Your Account status is ${user.status}`);
    }

    const payload = { employeeID, role };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET);
    return accessToken;
}