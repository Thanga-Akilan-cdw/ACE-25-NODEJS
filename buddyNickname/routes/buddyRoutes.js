import express from "express"

const router  = express.Router();

import { getAllBuddiesController, getBuddyController, getBuddyByNameController, createBuddyController, updateBuddyController, deleteBuddyController } from "../controller/buddyController.js";

// Route to get all Buddies 
router.get('/', getAllBuddiesController);

//Route to get a particular buddy
router.get('/id/:employeeID',getBuddyController)

router.get('/name/:name', getBuddyByNameController)

//Route to create a new buddy
router.post('/', createBuddyController)

//Route to update values of buddy
router.put('/id/:employeeID', updateBuddyController);

//Route to delete a buddy
router.delete('/id/:employeeID', deleteBuddyController);

export {
    router as buddyRouter,
}