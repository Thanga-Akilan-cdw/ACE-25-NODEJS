import { getAllBuddies, getBuddy, createBuddy, updateBuddy, deleteBuddy  } from "../services/buddyService.js";


// Get all buddy
const getAllBuddiesController = (req,res) => {
    res.send(getAllBuddies());
}

// Get a particular buddy
const getBuddyController = (req, res) => {
    const employeeID = req.params.employeeID;
    res.send(getBuddy(employeeID));
}

// Create a buddy
const createBuddyController = (req,res) => {
    createBuddy(req.body);
    res.send("Account created Successfully")
}

//Update a buddy
const updateBuddyController = (req,res) => {
    const data = req.body;
    const employeeID = req.params.employeeID;
    updateBuddy(employeeID, data)
    res.send("Updated successfully")
}

//Delete a buddy
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