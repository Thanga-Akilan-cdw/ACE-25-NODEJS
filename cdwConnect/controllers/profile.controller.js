import { fetchProfileData } from "../services/profile.service.js";
import { createNewProfile } from "../utils/profileHandler.js";
import { serviceLogger } from "../logger/index.js";


export const createProfileController = async (req, res, next) =>{ 
    try {
        const data = req.body;
        data.employeeID = req.user.employeeID;
        await createNewProfile(data);
        serviceLogger.info(`Created a Profile ${employeeID}`)
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
        serviceLogger.info(`Fetched Profile ${employeeID}`);
        res.send(profile);
    }
    catch(error){
        next(error);
    }
}