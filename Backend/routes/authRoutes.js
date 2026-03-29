const express = require('express');
const router = express.Router();

const { jwtAuthMiddleware } = require('../middleware/jwt');

const {
    registerUser,
    loginUser,
    getProfile,
    changePassword
} = require('../controllers/authController');

// ✅ ROUTES
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', jwtAuthMiddleware, getProfile);
router.put('/profile/password', jwtAuthMiddleware, changePassword);

module.exports = router;