import { Router, Request, Response } from 'express';
import { User } from '../models/User';
import { authenticateToken, requireRole } from '../middleware/auth';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = Router();

// Get user preferences
router.get('/preferences', authenticateToken, asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json({
    success: true,
    message: 'User preferences retrieved successfully',
    data: user.preferences
  });
}));

// Update user preferences
router.put('/preferences', authenticateToken, asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { niches, notifications, emailUpdates } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Update preferences
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

  logger.info(`User preferences updated for: ${user.email}`);

  res.json({
    success: true,
    message: 'User preferences updated successfully',
    data: user.preferences
  });
}));

// Add niche to user preferences
router.post('/preferences/niches', authenticateToken, asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { niche } = req.body;

  if (!niche || typeof niche !== 'string') {
    throw new AppError('Niche is required and must be a string', 400);
  }

  const normalizedNiche = niche.toLowerCase().trim();

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Add niche if not already present
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

// Remove niche from user preferences
router.delete('/preferences/niches/:niche', authenticateToken, asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { niche } = req.params;

  const normalizedNiche = niche.toLowerCase().trim();

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Remove niche from preferences
  user.preferences.niches = user.preferences.niches.filter(n => n !== normalizedNiche);
  await user.save();

  res.json({
    success: true,
    message: 'Niche removed from preferences successfully',
    data: user.preferences.niches
  });
}));

// Get all users (admin only)
router.get('/all', authenticateToken, requireRole(['admin']), asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, limit = 10, search } = req.query;

  const query: any = {};
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
    User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit.toString())),
    User.countDocuments(query)
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

// Update user status (admin only)
router.put('/:userId/status', authenticateToken, requireRole(['admin']), asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { isActive } = req.body;

  if (typeof isActive !== 'boolean') {
    throw new AppError('isActive must be a boolean', 400);
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  user.isActive = isActive;
  await user.save();

  logger.info(`User status updated: ${user.email} - Active: ${isActive}`);

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

// Update user role (admin only)
router.put('/:userId/role', authenticateToken, requireRole(['admin']), asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!['user', 'admin', 'premium'].includes(role)) {
    throw new AppError('Invalid role', 400);
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  user.role = role;
  await user.save();

  logger.info(`User role updated: ${user.email} - Role: ${role}`);

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

// Delete user account
router.delete('/account', authenticateToken, asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  await User.findByIdAndDelete(userId);

  logger.info(`User account deleted: ${user.email}`);

  res.json({
    success: true,
    message: 'Account deleted successfully'
  });
}));

export default router;

