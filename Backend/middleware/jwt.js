const jwt = require('jsonwebtoken');


// ✅ AUTH MIDDLEWARE
const jwtAuthMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: 'No token provided' });
        }

        // Expecting: Bearer <token>
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Invalid token format' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // 🔥 contains id + role
        next();

    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};


// ✅ GENERATE TOKEN
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: '1d'   // 🔥 FIXED
    });
};


module.exports = { jwtAuthMiddleware, generateToken };