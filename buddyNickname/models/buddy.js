
export class Buddy{
    constructor(employeeID, realName, nickName, dateOfBirth, hobbies){
        this.employeeID = employeeID;
        this.realName = realName;
        this.nickName = nickName;
        this.dateOfBirth = dateOfBirth;
        this.hobbies = hobbies;
    }

    static isValid(buddy){
        return (buddy.employeeID &&
        buddy.realName &&
        buddy.nickName &&
        buddy.dateOfBirth &&
        buddy.hobbies  &&
        Array.isArray(buddy.hobbies));
    }
}
