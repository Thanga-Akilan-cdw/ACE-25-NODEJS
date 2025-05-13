import { getAllBuddies, getBuddy, createBuddy, updateBuddy, deleteBuddy  } from "../services/buddyService.js";

const getAllBuddiesController = (req,res) => {
    res.send(getAllBuddies());
}

const getBuddyController = (req, res) => {
    const employeeID = req.params.employeeID;
    res.send(getBuddy(employeeID));
}


const createBuddyController = (req,res) => {
    createBuddy(req.body);
    res.send("Account created Successfully")
}

const updateBuddyController = (req,res) => {
    const data = req.body;
    const employeeID = req.params.employeeID;
    updateBuddy(employeeID, data)
    res.send("Updated successfully")
}

const deleteBuddyController = (req,res) => {
    const employeeID = req.params.employeeID;
    deleteBuddy(employeeID);
    res.send("Deletion successful");
}


export {
    getAllBuddiesController,
    getBuddyController,
    createBuddyController,
    updateBuddyController,
    deleteBuddyController
}