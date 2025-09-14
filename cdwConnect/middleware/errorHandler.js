import { serviceLogger } from "../logger/index.js";

function errorHandler(err, req, res, next){
    const statusCode = err.statusCode || 500;
    serviceLogger.error(`Error ${err.name} : ${err.message}`)
    res.status(statusCode).json({
        error: err.name,
        message: err.message
    })
}

export default errorHandler;