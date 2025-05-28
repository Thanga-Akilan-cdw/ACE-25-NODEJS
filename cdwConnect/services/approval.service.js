import { getUser, getUsers, updateUserStatus } from "../utils/userHandling.js"
import { verifyUserWithWalletJSON } from "../utils/verifyUser.js";


export const fetchPendingUsers = async () => {
    const users = await getUsers({status: "pending"});
    return users;
}


export const approveUser = async (employeeID) => {
    const user = await getUser({employeeID});
    const isExists = await verifyUserWithWalletJSON(user);
    if(!isExists){
        await updateUserStatus(employeeID, "rejected");
        throw new Error("User not found in Wallet Database");
    }
    await updateUserStatus(employeeID, "approved");
    return;

}