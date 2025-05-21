import InvalidUsernameError from "../errors/InvalidUsernameError.js";
import { readDataFromFile, writeDataToFile } from "../utils/fileHandling.js"
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const signupUser = async (data) => {
    const users = await readDataFromFile(process.env.USERS_JSON_FILENAME);
    const isExists = users.some(user => user.username == data.username);
    if(!isExists){
        throw new InvalidUsernameError();
    }
    users?.push(data);
    writeDataToFile(process.env.USERS_JSON_FILENAME, users);
}


export const signin = async (data) => {
    const users = await readDataFromFile(process.env.USERS_JSON_FILENAME);
    const isExists = users.some(user => user.username == data.username);
    if(!isExists){
        throw new InvalidUsernameError();
    }
    const payload = { username: data.username};
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET);
    return accessToken;
}