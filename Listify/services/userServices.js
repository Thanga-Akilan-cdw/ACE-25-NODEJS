import InvalidUsernameError from "../errors/InvalidUsernameError.js";
import WrongPasswordError from "../errors/WrongPasswordError.js";
import { readDataFromFile, writeDataToFile } from "../utils/fileHandling.js"
import { generateHash } from "../utils/generateHash.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const signupUser = async (data) => {
    const { username, password } = data;
    const users = await readDataFromFile(process.env.USERS_JSON_FILENAME);
    const isExists = users.some(user => user.username == username);
    if(isExists){
        throw new InvalidUsernameError();
    }
    users?.push({username: username, password: generateHash(password)});
    console.log(users)

    writeDataToFile(process.env.USERS_JSON_FILENAME, users);
}


export const signin = async (data) => {
    const users = await readDataFromFile(process.env.USERS_JSON_FILENAME);
    const user = users.find(user => user.username == data.username);
    if(!user){
        throw new InvalidUsernameError();
    }
    if(user.password == generateHash(data.password)){    
        const payload = { username: data.username};
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET);
        return accessToken;
    }else{
        throw new WrongPasswordError();
    }

}