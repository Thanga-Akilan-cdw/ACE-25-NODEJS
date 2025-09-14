import { createNewProfile, fetchProfileDataFromDB } from "../utils/profileHandler.js"


export const createProfile = async (data)=>{
    const {employeeID, name, gender, profilePic, bio, designation, certifications, experience, bu, workLocation} = data;

const profileData = {
    employeeID,
    name,
    gender: gender || "",
    profilePic: profilePic || "",
    bio: bio || "",
    designation: designation || "",
    certifications: certifications || [],
    experience: experience || "",
    bu: bu || "",
    workLocation: workLocation || ""
}
if(employeeID && name){
    await createNewProfile(profileData);
}
throw new Error("No identifier specified");
}


export const fetchProfileData = async (employeeID) => {
    return fetchProfileDataFromDB(employeeID);
}