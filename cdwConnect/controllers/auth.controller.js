import { signinUser, signupUser } from '../services/auth.service.js'
import { authLogger } from '../logger/index.js';


export const signupUserController = async (req, res, next) => {
    try{
        const data = req.body;
        await signupUser(data);
        authLogger.info(`User ${data.employeeID} signed Up`)
        res.send("Signup Successful");
    }catch(error){
        next(error);
    }

}

export const signinUserController = async (req, res, next) => {
    try{
        const data = req.body;
        const accessToken = await signinUser(data);
        authLogger.info(`User ${data.employeeID} signed in successfully`);
        res.json({token: accessToken});
    }
    catch(error){
        next(error);
    }

}