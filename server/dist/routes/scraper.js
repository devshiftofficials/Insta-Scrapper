"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const InstagramScraperService_1 = require("../services/InstagramScraperService");
const NicheAnalysis_1 = require("../models/NicheAnalysis");
const auth_1 = require("../middleware/auth");
const errorHandler_1 = require("../middleware/errorHandler");
const redis_1 = require("../utils/redis");
const logger_1 = require("../utils/logger");
const router = (0, express_1.Router)();
router.post('/analyze-niche', auth_1.optionalAuth, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { niche } = req.body;
    if (!niche || typeof niche !== 'string') {
        res.status(400).json({
            success: false,
            message: 'Niche is required and must be a string'
        });
        return;
    }
    const normalizedNiche = niche.toLowerCase().trim();
    const cacheKey = `niche_analysis_${normalizedNiche}`;
    const cachedResult = await (0, redis_1.getCache)(cacheKey);
    if (cachedResult) {
        logger_1.logger.info(`Returning cached analysis for niche: ${normalizedNiche}`);
        res.json({
            success: true,
            message: 'Niche analysis retrieved successfully',
            data: cachedResult,
            cached: true
        });
        return;
    }
    try {
        let analysis = await NicheAnalysis_1.NicheAnalysis.findOne({ niche: normalizedNiche });
        if (analysis && (Date.now() - analysis.lastUpdated.getTime()) < 3600000) {
            await (0, redis_1.setCache)(cacheKey, analysis, 3600);
            res.json({
                success: true,
                message: 'Niche analysis retrieved successfully',
                data: analysis,
                cached: false
            });
            return;
        }
        logger_1.logger.info(`Starting new analysis for niche: ${normalizedNiche}`);
        const newAnalysis = await InstagramScraperService_1.instagramScraper.analyzeNiche(normalizedNiche);
        if (analysis) {
            Object.assign(analysis, newAnalysis);
            await analysis.save();
        }
        else {
            analysis = new NicheAnalysis_1.NicheAnalysis(newAnalysis);
            await analysis.save();
        }
        await (0, redis_1.setCache)(cacheKey, analysis, 3600);
        res.json({
            success: true,
            message: 'Niche analysis completed successfully',
            data: analysis,
            cached: false
        });
        return;
    }
    catch (error) {
        logger_1.logger.error(`Error analyzing niche ${normalizedNiche}:`, error);
        res.status(500).json({
            success: false,
            message: 'Failed to analyze niche',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
}));
router.get('/trending-hashtags', auth_1.optionalAuth, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { niche, limit = 10 } = req.query;
    try {
        let hashtags;
        if (niche) {
            const analysis = await NicheAnalysis_1.NicheAnalysis.findOne({ niche: niche.toString().toLowerCase() });
            hashtags = analysis?.trendingHashtags || [];
        }
        else {
            const analyses = await NicheAnalysis_1.NicheAnalysis.find({}).limit(5);
            hashtags = analyses.flatMap(analysis => analysis.trendingHashtags);
        }
        hashtags = hashtags
            .sort((a, b) => b.posts - a.posts)
            .slice(0, parseInt(limit.toString()));
        res.json({
            success: true,
            message: 'Trending hashtags retrieved successfully',
            data: hashtags
        });
    }
    catch (error) {
        logger_1.logger.error('Error retrieving trending hashtags:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve trending hashtags'
        });
    }
}));
router.get('/trending-audios', auth_1.optionalAuth, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { niche, limit = 10 } = req.query;
    try {
        let audios;
        if (niche) {
            const analysis = await NicheAnalysis_1.NicheAnalysis.findOne({ niche: niche.toString().toLowerCase() });
            audios = analysis?.trendingAudios || [];
        }
        else {
            const analyses = await NicheAnalysis_1.NicheAnalysis.find({}).limit(5);
            audios = analyses.flatMap(analysis => analysis.trendingAudios);
        }
        audios = audios
            .sort((a, b) => b.plays - a.plays)
            .slice(0, parseInt(limit.toString()));
        res.json({
            success: true,
            message: 'Trending audios retrieved successfully',
            data: audios
        });
    }
    catch (error) {
        logger_1.logger.error('Error retrieving trending audios:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve trending audios'
        });
    }
}));
router.get('/top-influencers', auth_1.optionalAuth, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { niche, limit = 10 } = req.query;
    try {
        let influencers;
        if (niche) {
            const analysis = await NicheAnalysis_1.NicheAnalysis.findOne({ niche: niche.toString().toLowerCase() });
            influencers = analysis?.topInfluencers || [];
        }
        else {
            const analyses = await NicheAnalysis_1.NicheAnalysis.find({}).limit(5);
            influencers = analyses.flatMap(analysis => analysis.topInfluencers);
        }
        influencers = influencers
            .sort((a, b) => b.followers - a.followers)
            .slice(0, parseInt(limit.toString()));
        res.json({
            success: true,
            message: 'Top influencers retrieved successfully',
            data: influencers
        });
    }
    catch (error) {
        logger_1.logger.error('Error retrieving top influencers:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve top influencers'
        });
    }
}));
router.get('/viral-posts', auth_1.optionalAuth, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { niche, limit = 10 } = req.query;
    try {
        let posts;
        if (niche) {
            const analysis = await NicheAnalysis_1.NicheAnalysis.findOne({ niche: niche.toString().toLowerCase() });
            posts = analysis?.viralPosts || [];
        }
        else {
            const analyses = await NicheAnalysis_1.NicheAnalysis.find({}).limit(5);
            posts = analyses.flatMap(analysis => analysis.viralPosts);
        }
        posts = posts
            .sort((a, b) => b.likes - a.likes)
            .slice(0, parseInt(limit.toString()));
        res.json({
            success: true,
            message: 'Viral posts retrieved successfully',
            data: posts
        });
    }
    catch (error) {
        logger_1.logger.error('Error retrieving viral posts:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve viral posts'
        });
    }
}));
router.post('/refresh-niche', auth_1.authenticateToken, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { niche } = req.body;
    if (!niche || typeof niche !== 'string') {
        res.status(400).json({
            success: false,
            message: 'Niche is required and must be a string'
        });
        return;
    }
    const normalizedNiche = niche.toLowerCase().trim();
    try {
        logger_1.logger.info(`Refreshing analysis for niche: ${normalizedNiche}`);
        const newAnalysis = await InstagramScraperService_1.instagramScraper.analyzeNiche(normalizedNiche);
        const analysis = await NicheAnalysis_1.NicheAnalysis.findOneAndUpdate({ niche: normalizedNiche }, newAnalysis, { upsert: true, new: true });
        const cacheKey = `niche_analysis_${normalizedNiche}`;
        await (0, redis_1.setCache)(cacheKey, analysis, 3600);
        res.json({
            success: true,
            message: 'Niche data refreshed successfully',
            data: analysis
        });
    }
    catch (error) {
        logger_1.logger.error(`Error refreshing niche ${normalizedNiche}:`, error);
        res.status(500).json({
            success: false,
            message: 'Failed to refresh niche data'
        });
    }
}));
exports.default = router;
//# sourceMappingURL=scraper.js.map