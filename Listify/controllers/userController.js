import { signin, signupUser } from "../services/userServices.js";


export const signupUserController = async (req, res, next) => {
    try {
        const data = req.body;
        await signupUser(data);
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
        res.json({ token : accessToken })
    }catch(error){
        next(error);
    }
}