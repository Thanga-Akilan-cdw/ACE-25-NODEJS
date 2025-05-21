import express from "express"
import { writeToFile } from "./helper/fileUtils.js";
import { buddyRouter } from "./routes/buddyRoutes.js";
import cors from "cors"
import { logger } from "./utils/logger.js";


const app = express();
// Port to listen 
const PORT = 3000;

app.use((req, res, next) => {
    logger.http(`${req.method} ${req.url}`);
    next();
  });

app.use(express.json());
app.use(cors());

// Buddies Routes
app.use('/buddies',buddyRouter)

// App listening and startup function
app.listen(PORT, ()=>{
    writeToFile("cdw_ace23_buddies.json",[]);
    logger.info("Server listening at port 3000")
})


