import { signin, signupUser } from "../services/userServices.js";
import { userLogger } from "../logger/index.js";

export const signupUserController = async (req, res, next) => {
    try {
        const data = req.body;
        await signupUser(data);
        userLogger.info(`User ${data.username} Signup successful`)
        res.send("Signup Successful");
    }
    catch(error){
        next(error);
    }
}


export const signinUserController = async (req, res, next) => {
    try{
        const data = req.body;
        const accessToken = await signin(data);
        userLogger.info(`User ${data.username} Signin successful`)
        res.json({ token : accessToken })
    }catch(error){
        next(error);
    }
}