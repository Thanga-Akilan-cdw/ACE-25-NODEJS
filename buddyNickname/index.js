import express from "express"
import { writeToFile } from "./helper/fileUtils.js";
import { buddyRouter } from "./routes/buddyRoutes.js";


const app = express();
// Port to listen 
const PORT = 3000;

app.use(express.json());

// Buddies Routes
app.use('/buddies',buddyRouter)

// App listening and startup function
app.listen(PORT, ()=>{
    writeToFile("cdw_ace23_buddies.json",[]);
    console.log("Server listening at port 3000")
})


