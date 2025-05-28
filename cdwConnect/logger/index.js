import winston from 'winston';
import dotenv from 'dotenv';
const { timestamp, prettyPrint, json, combine } = winston.format;

dotenv.config();


export const authLogger = winston.createLogger({
    level: process.env.LOGGER_LEVEL,
    format: combine( timestamp(), prettyPrint(), json()),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: process.env.AUTH_LOG_FILENAME}),
        new winston.transports.File({filename: process.env.AUTH_LOG_ERR_FILENAME, level: "error"})
    ],
    defaultMeta: { service : "auth-service"}
})

export const serviceLogger = winston.createLogger({
    level: process.env.LOGGER_LEVEL,
    format: combine( timestamp(), prettyPrint(), json()),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: process.env.SERVICE_LOG_FILENAME}),
        new winston.transports.File({filename: process.env.SERVICE_LOG_ERR_FILENAME, level: "error"})
    ],
    defaultMeta: { service : "connect-service"}
})

export const dbLogger = winston.createLogger({
    level: process.env.LOGGER_LEVEL,
    format: combine( timestamp(), prettyPrint(), json()),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: process.env.DB_LOG_FILENAME}),
        new winston.transports.File({filename: process.env.DB_LOG_ERR_FILENAME, level: "error"})
    ],
    defaultMeta: { service : "db-service"}
})