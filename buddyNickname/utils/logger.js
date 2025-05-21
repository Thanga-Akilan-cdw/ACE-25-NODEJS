import winston from "winston";
import dotenv from 'dotenv';
const { combine, timestamp, prettyPrint, json } = winston.format;

dotenv.config();


export const logger = winston.createLogger({
    level: process.env.LOGGER_LEVEL || 'http',
    format: combine(timestamp(), prettyPrint(), json()),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: process.env.LOG_FILENAME}),
        new winston.transports.File({filename: process.env.Log_ERR_FILENAME, level: "error"})
    ],
    defaultMeta: { service : "buddy-service"}
})

