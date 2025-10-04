"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NicheAnalysis_1 = require("../models/NicheAnalysis");
const User_1 = require("../models/User");
const auth_1 = require("../middleware/auth");
const errorHandler_1 = require("../middleware/errorHandler");
const logger_1 = require("../utils/logger");
const router = (0, express_1.Router)();
router.get('/dashboard', auth_1.authenticateToken, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user.userId;
    try {
        const user = await User_1.User.findById(userId);
        const userNiches = user?.preferences.niches || [];
        const analyses = await NicheAnalysis_1.NicheAnalysis.find({
            niche: { $in: userNiches }
        }).sort({ lastUpdated: -1 });
        const totalHashtags = analyses.reduce((sum, analysis) => sum + analysis.trendingHashtags.length, 0);
        const totalAudios = analyses.reduce((sum, analysis) => sum + analysis.trendingAudios.length, 0);
        const totalInfluencers = analyses.reduce((sum, analysis) => sum + analysis.topInfluencers.length, 0);
        const totalViralPosts = analyses.reduce((sum, analysis) => sum + analysis.viralPosts.length, 0);
        const allHashtags = analyses.flatMap(analysis => analysis.trendingHashtags);
        const topHashtags = allHashtags
            .sort((a, b) => b.posts - a.posts)
            .slice(0, 10);
        const allAudios = analyses.flatMap(analysis => analysis.trendingAudios);
        const topAudios = allAudios
            .sort((a, b) => b.plays - a.plays)
            .slice(0, 10);
        res.json({
            success: true,
            message: 'Dashboard analytics retrieved successfully',
            data: {
                summary: {
                    totalNiches: analyses.length,
                    totalHashtags,
                    totalAudios,
                    totalInfluencers,
                    totalViralPosts
                },
                topHashtags,
                topAudios,
                recentAnalyses: analyses.slice(0, 5),
                userNiches
            }
        });
    }
    catch (error) {
        logger_1.logger.error('Error retrieving dashboard analytics:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve dashboard analytics'
        });
    }
}));
router.get('/niche-performance/:niche', auth_1.authenticateToken, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { niche } = req.params;
    const { days = 30 } = req.query;
    try {
        const analysis = await NicheAnalysis_1.NicheAnalysis.findOne({ niche: niche.toLowerCase() });
        if (!analysis) {
            res.status(404).json({
                success: false,
                message: 'Niche analysis not found'
            });
            return;
        }
        const performanceData = {
            niche: analysis.niche,
            currentData: {
                hashtags: analysis.trendingHashtags.length,
                audios: analysis.trendingAudios.length,
                influencers: analysis.topInfluencers.length,
                viralPosts: analysis.viralPosts.length,
                marketSize: analysis.marketSize,
                competition: analysis.competition
            },
            trends: {
                hashtagGrowth: '+15%',
                audioGrowth: '+8%',
                influencerGrowth: '+12%',
                marketGrowth: '+5%'
            },
            lastUpdated: analysis.lastUpdated
        };
        res.json({
            success: true,
            message: 'Niche performance data retrieved successfully',
            data: performanceData
        });
    }
    catch (error) {
        logger_1.logger.error(`Error retrieving niche performance for ${niche}:`, error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve niche performance data'
        });
    }
}));
router.get('/recommendations', auth_1.authenticateToken, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user.userId;
    try {
        const user = await User_1.User.findById(userId);
        const userNiches = user?.preferences.niches || [];
        if (userNiches.length === 0) {
            res.json({
                success: true,
                message: 'No recommendations available',
                data: {
                    hashtags: [],
                    audios: [],
                    contentIdeas: [],
                    postingTimes: []
                }
            });
            return;
        }
        const analyses = await NicheAnalysis_1.NicheAnalysis.find({
            niche: { $in: userNiches }
        });
        const allHashtags = analyses.flatMap(analysis => analysis.trendingHashtags);
        const allAudios = analyses.flatMap(analysis => analysis.trendingAudios);
        const allContentIdeas = analyses.flatMap(analysis => analysis.contentIdeas);
        const allPostingTimes = analyses.flatMap(analysis => analysis.bestPostingTimes);
        const recommendedHashtags = allHashtags
            .sort((a, b) => b.posts - a.posts)
            .slice(0, 20);
        const recommendedAudios = allAudios
            .sort((a, b) => b.plays - a.plays)
            .slice(0, 15);
        const recommendedContentIdeas = [...new Set(allContentIdeas)].slice(0, 10);
        const recommendedPostingTimes = [...new Set(allPostingTimes)].slice(0, 5);
        res.json({
            success: true,
            message: 'Content recommendations retrieved successfully',
            data: {
                hashtags: recommendedHashtags,
                audios: recommendedAudios,
                contentIdeas: recommendedContentIdeas,
                postingTimes: recommendedPostingTimes
            }
        });
    }
    catch (error) {
        logger_1.logger.error('Error retrieving content recommendations:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve content recommendations'
        });
    }
}));
router.get('/market-insights', auth_1.authenticateToken, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    try {
        const analyses = await NicheAnalysis_1.NicheAnalysis.find({}).sort({ lastUpdated: -1 });
        const totalNiches = analyses.length;
        const totalMarketSize = analyses.reduce((sum, analysis) => sum + analysis.marketSize, 0);
        const avgMarketSize = totalMarketSize / totalNiches;
        const competitionLevels = analyses.reduce((acc, analysis) => {
            acc[analysis.competition] = (acc[analysis.competition] || 0) + 1;
            return acc;
        }, {});
        const topNichesBySize = analyses
            .sort((a, b) => b.marketSize - a.marketSize)
            .slice(0, 10)
            .map(analysis => ({
            niche: analysis.niche,
            marketSize: analysis.marketSize,
            competition: analysis.competition
        }));
        const insights = {
            totalNiches,
            totalMarketSize,
            avgMarketSize,
            competitionLevels,
            topNichesBySize,
            lastUpdated: new Date()
        };
        res.json({
            success: true,
            message: 'Market insights retrieved successfully',
            data: insights
        });
    }
    catch (error) {
        logger_1.logger.error('Error retrieving market insights:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve market insights'
        });
    }
}));
exports.default = router;
//# sourceMappingURL=analytics.js.map