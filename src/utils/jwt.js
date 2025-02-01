import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { addToBlacklist, isTokenBlacklisted } from '../utils/tokenBlackList.js';

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;
const defaultExpiration = '1h';

function generateToken(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: defaultExpiration });
}

async function verifyToken(token) {
    if (isTokenBlacklisted(token)) {
        return null;
    }
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        return null;
    }
}

async function refreshToken(token) {
    const decoded = verifyToken(token);
    if (decoded) {
        return generateToken({ ...decoded });
    }
    return null;
}

async function revokeToken(token) {
    addToBlacklist(token);
}

export {
    generateToken,
    verifyToken,
    refreshToken,
    revokeToken
};