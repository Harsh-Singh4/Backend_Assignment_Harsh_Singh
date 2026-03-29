const User = require('../models/user');
const { generateToken } = require('../middleware/jwt');

// ✅ REGISTER
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new User({
            name,
            email,
            password,
            role: role || 'user'
        });

        const response = await newUser.save();

        const userObj = response.toObject();
        delete userObj.password;

        const payload = {
            id: response.id,
            role: response.role
        };

        const token = generateToken(payload);

        res.status(201).json({
            user: userObj,
            token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// ✅ LOGIN
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const payload = {
            id: user.id,
            role: user.role
        };

        const token = generateToken(payload);

        res.status(200).json({
            token,
            role: user.role
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// ✅ PROFILE
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        const userObj = user.toObject();
        delete userObj.password;

        res.status(200).json(userObj);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// ✅ CHANGE PASSWORD
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Both passwords required' });
        }

        const user = await User.findById(req.user.id);

        if (!user || !(await user.comparePassword(currentPassword))) {
            return res.status(401).json({ error: 'Invalid current password' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getProfile,
    changePassword
};