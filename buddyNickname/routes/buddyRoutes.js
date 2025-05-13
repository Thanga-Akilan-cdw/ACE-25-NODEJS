import express from "express"

const router  = express.Router();

import { getAllBuddiesController, getBuddyController, createBuddyController, updateBuddyController, deleteBuddyController } from "../controller/buddyController.js";



router.get('/', getAllBuddiesController);

router.get('/id/:employeeID',getBuddyController)

router.post('/', createBuddyController)

router.put('/id/:employeeID', updateBuddyController);

router.delete('/id/:employeeID', deleteBuddyController);

export {
    router as buddyRouter,
}