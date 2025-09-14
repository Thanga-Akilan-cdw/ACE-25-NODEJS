import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const auth = (req, res, next) => {
    const token = req.headers['x-auth-token'];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.data = decoded;
    next();
}

export default auth;