import { startScheduler } from "./scheduler.js"



export const runStartupJobs = async () => {
    await startScheduler();
}