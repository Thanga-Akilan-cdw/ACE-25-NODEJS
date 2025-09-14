import winston from "winston";
import dotenv from 'dotenv';
const { combine, timestamp, prettyPrint, json } =  winston.format

dotenv.config();


export const userLogger = winston.createLogger({
    level: process.env.LOGGER_LEVEL,
    format: combine( timestamp(), prettyPrint(), json()),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: process.env.USER_LOG_FILENAME}),
        new winston.transports.File({filename: process.env.USER_LOG_ERR_FILENAME, level: "error"})
    ],
    defaultMeta: { service : "user-service"}
})


export const taskLogger = winston.createLogger({
    level: process.env.LOGGER_LEVEL,
    format: combine( timestamp(), prettyPrint(), json()),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: process.env.TASK_LOG_FILENAME}),
        new winston.transports.File({filename: process.env.TASK_LOG_ERR_FILENAME, level: "error"})
    ],
    defaultMeta: { service : "task-service"}
})