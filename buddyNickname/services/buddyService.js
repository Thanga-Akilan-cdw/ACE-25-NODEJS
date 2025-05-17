
import { appendToFile, readFileData ,writeToFile } from "../helper/fileUtils.js";
import { ValidateBuddy } from "../helper/validateBuddy.js";

const fileName = 'cdw_ace23_buddies.json';

// Get all buddy
const getAllBuddies = async () => {
    const fileData = await readFileData(fileName);
    return fileData;
}

//Get a buddy by employee ID
const getBuddy = async (employeeID) => {
    const buddies = await readFileData(fileName);
    const buddy = (buddies) ? buddies.find(buddy => buddy.employeeID == employeeID):null;
    if(!buddy){
        throw new Error("Employee with the ID does not exist");
    }
    return buddy;
}

// Get buddy by Name
const getBuddyByName = async (name) => {
    const buddies = await readFileData(fileName);
    const buddy = (buddies) ? buddies.find(buddy => buddy.name == name):{};
    return buddy;
}

// create a buddy
const createBuddy = async (employee) => {
    if(ValidateBuddy(employee)){
        const buddies = await readFileData(fileName);
        if(!buddies.find(buddy => buddy.employeeID == employee.employeeID)){
            await appendToFile(fileName, employee);
            return {success: true};
        }else{
            return { success: false, message: "Employee ID already exists"}
        }
    }else{
        return {success: false, message: "Provide all required details"}
    }

}


// update a buddy
const updateBuddy = async (employeeID, data) => {
    const buddies = await readFileData(fileName);
    const buddy = buddies.find(b => b.employeeID == employeeID);
    if (buddy) {
        for (let property in data) {
            if(Object.keys(buddy).includes(property)){
                buddy[property] = data[property];
            }else{
                throw new Error("Invalid Property specified");
            }
        }
        // Write back the entire updated array
        await writeToFile(fileName, buddies);
    } else {
        throw new Error("Employee not found");
    }
}


// delete a buddy
const deleteBuddy = async (employeeID) => {
    const buddies = await readFileData(fileName);// Check if employee exists
    const exists = buddies.some(
        (buddy) => String(buddy.employeeID) === String(employeeID)
    );

    if (!exists) {
        throw new Error("Employee not found");
    }

    // Filter out the employee
    const remainingBuddies = buddies.filter(
        (buddy) => String(buddy.employeeID) !== String(employeeID)
    );
    await writeToFile(fileName, remainingBuddies);

}


export {
    getAllBuddies,
    getBuddy,
    getBuddyByName,
    createBuddy,
    updateBuddy,
    deleteBuddy
}