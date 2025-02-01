import { _register, _login, _logout } from '../../services/authServices.js';

// Register a new user
const register = async (req, res) => {
    try {
        await _register(req);
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Login a user
const login = async (req, res) => {
    try {
        await _login(req);
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

const logout = async (req, res) => {
    try {
        await _logout(req);
    } catch (error) {
        res.status(500).json({ message: 'Error logging out', error });
    }
};

export { register, login, logout };