import bcrypt from 'bcrypt';
import User from '../models/usersModels.js';
import { generateToken } from '../utils/jwt.js';

// Register a new user
const _register = async (data, res) => {
    const { username, email, password } = data;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        const token = generateToken({ id: newUser._id, role: newUser.role });
        res.status(201).json({ token, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Login a user
const _login = async (data, res) => {
    const { email, password } = data;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken({ id: user._id, role: user.role });
        res.status(200).json({ token, message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

const _logout = async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      addToBlacklist(token);
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error logging out', error });
    }
};
  

export { _register, _login, _logout };