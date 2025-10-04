"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCache = exports.getCache = exports.setCache = exports.disconnectRedis = exports.getRedisClient = exports.connectRedis = void 0;
const redis_1 = require("redis");
const logger_1 = require("./logger");
let redisClient = null;
const connectRedis = async () => {
    try {
        const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
        redisClient = (0, redis_1.createClient)({
            url: redisUrl,
            socket: {
                reconnectStrategy: (retries) => {
                    if (retries > 10) {
                        logger_1.logger.error('Redis max retry attempts reached');
                        return false;
                    }
                    return Math.min(retries * 100, 3000);
                }
            }
        });
        redisClient.on('connect', () => {
            logger_1.logger.info('✅ Redis connected successfully');
        });
        redisClient.on('error', (error) => {
            logger_1.logger.error('Redis connection error:', error);
        });
        redisClient.on('end', () => {
            logger_1.logger.warn('Redis connection ended');
        });
        await redisClient.connect();
    }
    catch (error) {
        logger_1.logger.error('Redis connection failed:', error);
        logger_1.logger.warn('Continuing without Redis cache');
    }
};
exports.connectRedis = connectRedis;
const getRedisClient = () => {
    return redisClient;
};
exports.getRedisClient = getRedisClient;
const disconnectRedis = async () => {
    if (redisClient) {
        try {
            await redisClient.disconnect();
            logger_1.logger.info('Redis disconnected');
        }
        catch (error) {
            logger_1.logger.error('Error disconnecting from Redis:', error);
        }
    }
};
exports.disconnectRedis = disconnectRedis;
const setCache = async (key, value, ttl = 3600) => {
    if (!redisClient)
        return;
    try {
        await redisClient.setEx(key, ttl, JSON.stringify(value));
    }
    catch (error) {
        logger_1.logger.error('Error setting cache:', error);
    }
};
exports.setCache = setCache;
const getCache = async (key) => {
    if (!redisClient)
        return null;
    try {
        const value = await redisClient.get(key);
        return value ? JSON.parse(value) : null;
    }
    catch (error) {
        logger_1.logger.error('Error getting cache:', error);
        return null;
    }
};
exports.getCache = getCache;
const deleteCache = async (key) => {
    if (!redisClient)
        return;
    try {
        await redisClient.del(key);
    }
    catch (error) {
        logger_1.logger.error('Error deleting cache:', error);
    }
};
exports.deleteCache = deleteCache;
//# sourceMappingURL=redis.js.map