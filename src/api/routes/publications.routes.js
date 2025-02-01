import express from 'express';
import upload2MB from '../middlewares/multerMiddleware.js';
import { verifyToken, refreshToken } from '../../utils/jwt.js';
import {
    getAllPublications, 
    getAllPublicationsByCategory, 
    getPublicationById, 
    getAllPublicationByIdUser, 
    createPublication, 
    updatePublication, 
    deletePublication 
} from '../controllers/publications.controller.js';

const router = express.Router();

// Middleware to verify and refresh token
const authenticate = async (req, res, next) => {
const token = req.headers['authorization'];
if (!token) {
    return res.status(401).json({ message: 'No token provided' });
}
const verified = await verifyToken(token);
if (!verified) {
    return res.status(401).json({ message: 'Invalid token' });
}
const newToken = await refreshToken(token);
res.setHeader('authorization', newToken);
next();
};

router.get('/', authenticate, getAllPublications);
router.get('/publications/category/:categoryId', authenticate, getAllPublicationsByCategory);
router.get('/publications/:id', authenticate, getPublicationById);
router.get('/publications/user/:userId', authenticate, getAllPublicationByIdUser);
router.post('/', authenticate, upload2MB.single('file'), createPublication);
router.put('/publications/:id', authenticate, upload2MB.single('file'), updatePublication);
router.delete('/:id', authenticate, deletePublication);

export default router;