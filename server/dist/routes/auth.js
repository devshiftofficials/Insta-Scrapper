"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const auth_1 = require("../middleware/auth");
const errorHandler_1 = require("../middleware/errorHandler");
const logger_1 = require("../utils/logger");
const router = (0, express_1.Router)();
router.post('/register', (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    if (!email || !password || !username || !firstName || !lastName) {
        throw new errorHandler_1.AppError('All fields are required', 400);
    }
    if (password.length < 6) {
        throw new errorHandler_1.AppError('Password must be at least 6 characters long', 400);
    }
    const existingUser = await User_1.User.findOne({
        $or: [{ email }, { username }]
    });
    if (existingUser) {
        throw new errorHandler_1.AppError('User with this email or username already exists', 409);
    }
    const user = new User_1.User({
        email,
        password,
        username,
        firstName,
        lastName,
        preferences: {
            niches: [],
            notifications: true,
            emailUpdates: true
        }
    });
    await user.save();
    const token = jsonwebtoken_1.default.sign({
        userId: user._id,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET, { expiresIn: '7d' });
    logger_1.logger.info(`New user registered: ${email}`);
    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                preferences: user.preferences
            },
            token
        }
    });
}));
router.post('/login', (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new errorHandler_1.AppError('Email and password are required', 400);
    }
    const user = await User_1.User.findOne({ email }).select('+password');
    if (!user) {
        throw new errorHandler_1.AppError('Invalid email or password', 401);
    }
    if (!user.isActive) {
        throw new errorHandler_1.AppError('Account is deactivated', 401);
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new errorHandler_1.AppError('Invalid email or password', 401);
    }
    user.lastLogin = new Date();
    await user.save();
    const token = jsonwebtoken_1.default.sign({
        userId: user._id,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET, { expiresIn: '7d' });
    logger_1.logger.info(`User logged in: ${email}`);
    res.json({
        success: true,
        message: 'Login successful',
        data: {
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                preferences: user.preferences,
                lastLogin: user.lastLogin
            },
            token
        }
    });
}));
router.get('/profile', auth_1.authenticateToken, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const user = await User_1.User.findById(req.user.userId);
    if (!user) {
        throw new errorHandler_1.AppError('User not found', 404);
    }
    res.json({
        success: true,
        message: 'Profile retrieved successfully',
        data: {
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                preferences: user.preferences,
                createdAt: user.createdAt,
                lastLogin: user.lastLogin
            }
        }
    });
}));
router.put('/profile', auth_1.authenticateToken, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { firstName, lastName, username, preferences } = req.body;
    const userId = req.user.userId;
    const user = await User_1.User.findById(userId);
    if (!user) {
        throw new errorHandler_1.AppError('User not found', 404);
    }
    if (firstName)
        user.firstName = firstName;
    if (lastName)
        user.lastName = lastName;
    if (username) {
        const existingUser = await User_1.User.findOne({ username, _id: { $ne: userId } });
        if (existingUser) {
            throw new errorHandler_1.AppError('Username is already taken', 409);
        }
        user.username = username;
    }
    if (preferences) {
        user.preferences = { ...user.preferences, ...preferences };
    }
    await user.save();
    logger_1.logger.info(`User profile updated: ${user.email}`);
    res.json({
        success: true,
        message: 'Profile updated successfully',
        data: {
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                preferences: user.preferences
            }
        }
    });
}));
router.put('/change-password', auth_1.authenticateToken, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId;
    if (!currentPassword || !newPassword) {
        throw new errorHandler_1.AppError('Current password and new password are required', 400);
    }
    if (newPassword.length < 6) {
        throw new errorHandler_1.AppError('New password must be at least 6 characters long', 400);
    }
    const user = await User_1.User.findById(userId).select('+password');
    if (!user) {
        throw new errorHandler_1.AppError('User not found', 404);
    }
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
        throw new errorHandler_1.AppError('Current password is incorrect', 400);
    }
    user.password = newPassword;
    await user.save();
    logger_1.logger.info(`Password changed for user: ${user.email}`);
    res.json({
        success: true,
        message: 'Password changed successfully'
    });
}));
router.get('/verify-token', auth_1.authenticateToken, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    res.json({
        success: true,
        message: 'Token is valid',
        data: {
            user: {
                id: req.user.userId,
                email: req.user.email,
                role: req.user.role
            }
        }
    });
}));
exports.default = router;
//# sourceMappingURL=auth.js.map