import { Buddy } from "../models/buddy.js";

export const ValidateBuddy = (employee) => {
    const {employeeID, realName, nickName, dob, hobbies} = employee;
    const buddy = new Buddy(employeeID, realName, nickName, dob, hobbies);
    return !(!Buddy.isValid(buddy));
}