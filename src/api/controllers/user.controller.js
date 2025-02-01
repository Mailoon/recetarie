import {
    _postUser,
    _getUsers,
    _getUser,
    _deleUser,
    _uploadProfileImage,
    _updateProfileImage
} from "../../services/userServices.js";

// Logic for creating user
const postUser = async (req, res) => {
    try {
        const user = new _postUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logic for getting users
const getUsers = async (req, res) => {
    try {
        const users = await _getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logic for getting a user
const getUser = async (req, res) => {
    try {
        const user = await _getUser(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logic for deleting user
const deleteUser = async (req, res) => {
    try {
        const user = await _deleUser(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logic for uploading profile image
const uploadProfileImage = async (req, res) => {
    try {
        const user = await _uploadProfileImage(req.params.userId, req.file.path);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logic for updating profile image
const updateProfileImage = async (req, res) => {
    try {
        const user = await _updateProfileImage(req.params.userId, req.file.path);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { 
    postUser,
    getUsers,
    getUser,
    deleteUser,
    uploadProfileImage,
    updateProfileImage
};