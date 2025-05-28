import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();


export const verifyUserWithWalletJSON = async (user)=>{
    try{
        const response = await axios.get(process.env.WALLET_JSON);
        const walletData = response.data;
        console.log("User : ",user)
        console.log("wallet data ",walletData)
        const matchedUser = walletData.some(walletUser =>
            walletUser.email == user.email &&
            walletUser.name == user.username &&
            walletUser.employeeID == user.employeeID
        )
        console.log("output  " ,matchedUser)
        return matchedUser;
    }
    catch(error){
        throw new Error("Wallet Verification Failed")
    }


}