import { fetchProfileData } from "../services/profile.service.js";
import { createNewProfile } from "../utils/profileHandler.js";



export const createProfileController = async (req, res, next) =>{ 
    try {
        const data = req.body;
        data.employeeID = req.user.employeeID;
        console.log(data);
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