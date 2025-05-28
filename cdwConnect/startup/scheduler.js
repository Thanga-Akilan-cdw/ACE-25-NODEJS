import cron from 'node-cron';

export const startScheduler = () => {
    cron.schedule('0 20 * * *',async () => {
        console.log('running a task every Day at 1am');// add loggers here
      });
}