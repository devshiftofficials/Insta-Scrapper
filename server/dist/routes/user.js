"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const auth_1 = require("../middleware/auth");
const errorHandler_1 = require("../middleware/errorHandler");
const logger_1 = require("../utils/logger");
const router = (0, express_1.Router)();
router.get('/preferences', auth_1.authenticateToken, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user.userId;
    const user = await User_1.User.findById(userId);
    if (!user) {
        throw new errorHandler_1.AppError('User not found', 404);
    }
    res.json({
        success: true,
        message: 'User preferences retrieved successfully',
        data: user.preferences
    });
}));
router.put('/preferences', auth_1.authenticateToken, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user.userId;
    const { niches, notifications, emailUpdates } = req.body;
    const user = await User_1.User.findById(userId);
    if (!user) {
        throw new errorHandler_1.AppError('User not found', 404);
    }
    if (niches !== undefined) {
        user.preferences.niches = Array.isArray(niches) ? niches : [];
    }
    if (notifications !== undefined) {
        user.preferences.notifications = Boolean(notifications);
    }
    if (emailUpdates !== undefined) {
        user.preferences.emailUpdates = Boolean(emailUpdates);
    }
    await user.save();
    logger_1.logger.info(`User preferences updated for: ${user.email}`);
    res.json({
        success: true,
        message: 'User preferences updated successfully',
        data: user.preferences
    });
}));
router.post('/preferences/niches', auth_1.authenticateToken, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user.userId;
    const { niche } = req.body;
    if (!niche || typeof niche !== 'string') {
        throw new errorHandler_1.AppError('Niche is required and must be a string', 400);
    }
    const normalizedNiche = niche.toLowerCase().trim();
    const user = await User_1.User.findById(userId);
    if (!user) {
        throw new errorHandler_1.AppError('User not found', 404);
    }
    if (!user.preferences.niches.includes(normalizedNiche)) {
        user.preferences.niches.push(normalizedNiche);
        await user.save();
    }
    res.json({
        success: true,
        message: 'Niche added to preferences successfully',
        data: user.preferences.niches
    });
}));
router.delete('/preferences/niches/:niche', auth_1.authenticateToken, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user.userId;
    const { niche } = req.params;
    const normalizedNiche = niche.toLowerCase().trim();
    const user = await User_1.User.findById(userId);
    if (!user) {
        throw new errorHandler_1.AppError('User not found', 404);
    }
    user.preferences.niches = user.preferences.niches.filter(n => n !== normalizedNiche);
    await user.save();
    res.json({
        success: true,
        message: 'Niche removed from preferences successfully',
        data: user.preferences.niches
    });
}));
router.get('/all', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 10, search } = req.query;
    const query = {};
    if (search) {
        query.$or = [
            { email: { $regex: search, $options: 'i' } },
            { username: { $regex: search, $options: 'i' } },
            { firstName: { $regex: search, $options: 'i' } },
            { lastName: { $regex: search, $options: 'i' } }
        ];
    }
    const skip = (parseInt(page.toString()) - 1) * parseInt(limit.toString());
    const [users, total] = await Promise.all([
        User_1.User.find(query)
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit.toString())),
        User_1.User.countDocuments(query)
    ]);
    res.json({
        success: true,
        message: 'Users retrieved successfully',
        data: users,
        pagination: {
            page: parseInt(page.toString()),
            limit: parseInt(limit.toString()),
            total,
            pages: Math.ceil(total / parseInt(limit.toString()))
        }
    });
}));
router.put('/:userId/status', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { userId } = req.params;
    const { isActive } = req.body;
    if (typeof isActive !== 'boolean') {
        throw new errorHandler_1.AppError('isActive must be a boolean', 400);
    }
    const user = await User_1.User.findById(userId);
    if (!user) {
        throw new errorHandler_1.AppError('User not found', 404);
    }
    user.isActive = isActive;
    await user.save();
    logger_1.logger.info(`User status updated: ${user.email} - Active: ${isActive}`);
    res.json({
        success: true,
        message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
        data: {
            id: user._id,
            email: user.email,
            isActive: user.isActive
        }
    });
}));
router.put('/:userId/role', auth_1.authenticateToken, (0, auth_1.requireRole)(['admin']), (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;
    if (!['user', 'admin', 'premium'].includes(role)) {
        throw new errorHandler_1.AppError('Invalid role', 400);
    }
    const user = await User_1.User.findById(userId);
    if (!user) {
        throw new errorHandler_1.AppError('User not found', 404);
    }
    user.role = role;
    await user.save();
    logger_1.logger.info(`User role updated: ${user.email} - Role: ${role}`);
    res.json({
        success: true,
        message: 'User role updated successfully',
        data: {
            id: user._id,
            email: user.email,
            role: user.role
        }
    });
}));
router.delete('/account', auth_1.authenticateToken, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user.userId;
    const user = await User_1.User.findById(userId);
    if (!user) {
        throw new errorHandler_1.AppError('User not found', 404);
    }
    await User_1.User.findByIdAndDelete(userId);
    logger_1.logger.info(`User account deleted: ${user.email}`);
    res.json({
        success: true,
        message: 'Account deleted successfully'
    });
}));
exports.default = router;
//# sourceMappingURL=user.js.map