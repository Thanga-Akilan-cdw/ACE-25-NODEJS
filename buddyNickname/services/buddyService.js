
import { appendToFile, readFileData ,writeToFile } from "../helper/fileUtils.js";

const fileName = 'cdw_ace23_buddies.json';

// Get all buddy
const getAllBuddies = async () => {
    const fileData = await readFileData(fileName);
    return fileData;
}

//Get a buddy
const getBuddy = async (employeeID) => {
    const buddies = await readFileData(fileName);
    const buddy = (buddies) ? buddies.find(buddy => buddy.employeeID == employeeID):{};
    return buddy;
}

// create a buddy
const createBuddy = async (employee) => {
    await appendToFile(fileName, employee);
}


// update a buddy
const updateBuddy = async (employeeID, data) => {
    const buddies = await readFileData(fileName);
    const buddy = buddies.find(buddy => buddy.employeeID == employeeID);
    if(buddy){
        for(let property in data){
            buddy[property] = data[property];
        }
    }
    await writeToFile(fileName, buddies);    
}

// delete a buddy
const deleteBuddy = async (employeeID) => {
    const buddies = await readFileData(fileName);
    const updatedBuddies = buddies.filter(buddy => buddy.employeeID !== employeeID);
   await writeToFile(fileName,updatedBuddies);

}


export {
    getAllBuddies,
    getBuddy,
    createBuddy,
    updateBuddy,
    deleteBuddy
}