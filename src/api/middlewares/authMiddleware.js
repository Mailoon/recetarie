import { verifyToken } from "../../utils/jwt";
import { isTokenBlacklisted } from "../../utils/tokenBlackList";

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    if (isTokenBlacklisted(token)) {
        return res.status(401).json({ message: 'Token is blacklisted' });
    }

    const decoded = await verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
};

export default authMiddleware;