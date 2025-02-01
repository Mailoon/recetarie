import express from 'express';
import {
    postUser,
    getUsers,
    getUser,
    deleteUser,
    uploadProfileImage,
    updateProfileImage
} from '../controllers/user.controller.js';
import upload2MB from '../middlewares/multerMiddleware.js';

const router = express.Router();

router.post('/users', postUser);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.delete('/users/:id', deleteUser);
router.post('/users/:userId/profileImage', upload2MB.single('image'), uploadProfileImage);
router.put('/users/:userId/profileImage', upload2MB.single('image'), updateProfileImage);

export default router;