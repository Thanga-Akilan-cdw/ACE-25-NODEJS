import { approveUser, fetchPendingUsers } from "../services/approval.service.js"; 
import { serviceLogger } from "../logger/index.js";


export const fetchPendingUsersController = async (req, res, next) => {
    const users = await fetchPendingUsers();
    serviceLogger.info(`Fetched Pending Users List`)
    res.send(users);
}

export const approveUserController = async (req, res, next) => {
    try{
        const {employeeID} = req.params;
        await approveUser(employeeID);
        serviceLogger.info(`Approved user ${employeeID}`)
        res.send(`Approved User ${employeeID}`)
    }
    catch(error){
        next(error);
    }
}