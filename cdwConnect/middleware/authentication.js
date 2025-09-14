import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

export const adminAuthentication = (req, res, next) => {
    const accessToken = req.headers['x-auth-token'];

    if(!accessToken){
        res.status(401).json({message: "Access Token missing"})
    }

    try{
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        
        if (!decoded.role || decoded.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden: Admins only" });
        }
        req.user = decoded;
        next()
    }
    catch(error){
        next(error);
    }
}

export const userAuthentication = (req, res, next) => {
    const accessToken = req.headers['x-auth-token'];

    if(!accessToken){
        res.status(401).json({message: "Access Token missing"})
    }

    try{
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    }
    catch(error){
        next(error);
    }
}