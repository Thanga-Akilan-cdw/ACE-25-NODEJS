import { getAllBuddies, getBuddy, getBuddyByName, createBuddy, updateBuddy, deleteBuddy  } from "../services/buddyService.js";


// Get all buddy
const getAllBuddiesController = async (req,res) => {
    res.send(await getAllBuddies());
}

// Get a particular buddy
const getBuddyController = async (req, res) => {
    try{
        const employeeID = req.params.employeeID;
        res.send(await getBuddy(employeeID));
    }catch(error){
        res.status(400).json({message: error.message})
    }
}

const getBuddyByNameController = (req,res) => {
    const buddyName = req.params.name;
    const buddy = getBuddyByName(buddyName);
    if(buddy){
        res.send(buddy);
    }
    res.status(404).json({message: "Account not found for the name"})
}

// Create a buddy
const createBuddyController =async (req,res) => {
    try{
        const result = await createBuddy(req.body);
        if(result.success){
        res.status(201).send("Account created Successfully")}
        else{
        res.status(400).json({message: result.message})}
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

//Update a buddy
const updateBuddyController = async (req,res) => {
    try{
        await updateBuddy(req.params.employeeID, req.body);
        res.send("Updated successfully")
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

//Delete a buddy
const deleteBuddyController = async (req,res) => {
    try{
        const employeeID = req.params.employeeID;
        await deleteBuddy(employeeID);
        res.send("Deletion successful");
    }catch(error){
        res.status(400).json({message: error.message});
    }
}


export {
    getAllBuddiesController,
    getBuddyController,
    getBuddyByNameController,
    createBuddyController,
    updateBuddyController,
    deleteBuddyController
}