import { fetchProfileData } from "../services/profile.service.js";
import { createNewProfile } from "../utils/profileHandler.js";



export const createProfileController = async (req, res, next) =>{ 
    try {
        const employeeIDFromURL = req.params.employeeID;
        const employeeIDFromLogin = req.user.employeeID;
        if(employeeIDFromLogin != employeeIDFromURL){
            throw new Error("You are not authorised to create for others.")
        }
        const data = req.body;
        console.log(data)
        await createNewProfile(data);
        res.send("Created Profile Successfully")
    }
    catch(error){
        next(error);
}
}

export const fetchProfileDataController = async (req, res, next ) => {
    try {
        const {employeeID} = req.params;
        const profile = await fetchProfileData(employeeID);
        res.send(profile);
    }
    catch(error){
        next(error);
    }
}