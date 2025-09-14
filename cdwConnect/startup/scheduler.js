import cron from 'node-cron';
import axios from 'axios';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { serviceLogger } from '../logger/index.js';

dotenv.config();


export const startScheduler = () => {
    cron.schedule('0 20 * * *',async () => {
        serviceLogger.info('User Syncing everyday at 8pm');
        syncUsers();
      });
}


const syncUsers = async () => {
    const {data : response} = await axios.get(process.env.WALLET_JSON)

    const listOfEmployeeID = response.map(user => user.employeeID);


    await User.deleteMany({ employeeID: { $nin: listOfEmployeeID}})
}