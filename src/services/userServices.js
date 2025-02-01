import { uploadImage, deleteImage } from "../utils/cloudinaryUtils.js";
import User from "../models/usersModels.js";

// Logic for creating user
const _postUser = async (req) => {
    const user = new User(req.body);
    await user.save();
    return user;
};

// Logic for getting users
const _getUsers = async () => {
    const users = await User.find();
    return users;
};

// Logic for getting a user
const _getUser = async (id) => {
    const user = await User.findById(id);
    return user;
};

// Logic for deleting user
const _deleUser = async (id) => {
    const user = await User.findById(id);
    if (user) {
        if (user.profileImage) {
            await deleteImage(user.profileImage);
        }
        await user.remove();
    }
    return user;
};

// Logic for uploading profile image
const _uploadProfileImage = async (userId, filePath) => {
    const user = await User.findById(userId);
    if (user) {
        const imageUrl = await uploadImage(filePath);
        user.profileImage = imageUrl;
        await user.save();
    }
    return user;
};

// Logic for updating profile image
const _updateProfileImage = async (userId, filePath) => {
    const user = await User.findById(userId);
    if (user) {
        if (user.profileImage) {
            await deleteImage(user.profileImage);
        }
        const imageUrl = await uploadImage(filePath);
        user.profileImage = imageUrl;
        await user.save();
    }
    return user;
};

export { 
    _postUser,
    _getUsers,
    _getUser,
    _deleUser,
    _uploadProfileImage,
    _updateProfileImage
};