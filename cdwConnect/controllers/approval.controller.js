import { approveUser, fetchPendingUsers } from "../services/approval.service.js"; 



export const fetchPendingUsersController = async (req, res, next) => {
    const users = await fetchPendingUsers();
    res.send(users);
}

export const approveUserController = async (req, res, next) => {
    try{
        const {employeeID} = req.params;
        await approveUser(employeeID);
        res.send(`Approved User ${employeeID}`)
    }
    catch(error){
        next(error);
    }
}