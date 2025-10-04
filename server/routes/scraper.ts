import { Router, Request, Response } from 'express';
import { instagramScraper } from '../services/InstagramScraperService';
import { NicheAnalysis } from '../models/NicheAnalysis';
import { authenticateToken, optionalAuth } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { getCache, setCache } from '../utils/redis';
import { logger } from '../utils/logger';

const router = Router();

// Analyze niche endpoint
router.post('/analyze-niche', optionalAuth, asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { niche } = req.body;

  if (!niche || typeof niche !== 'string') {
    res.status(400).json({
      success: false,
      message: 'Niche is required and must be a string'
    });
    return;
  }

  const normalizedNiche = niche.toLowerCase().trim();
  
  // Check cache first
  const cacheKey = `niche_analysis_${normalizedNiche}`;
  const cachedResult = await getCache(cacheKey);
  
  if (cachedResult) {
    logger.info(`Returning cached analysis for niche: ${normalizedNiche}`);
    res.json({
      success: true,
      message: 'Niche analysis retrieved successfully',
      data: cachedResult,
      cached: true
    });
    return;
  }

  try {
    // Check if analysis exists in database
    let analysis = await NicheAnalysis.findOne({ niche: normalizedNiche });
    
    if (analysis && (Date.now() - analysis.lastUpdated.getTime()) < 3600000) { // 1 hour
      // Return existing analysis if it's less than 1 hour old
      await setCache(cacheKey, analysis, 3600); // Cache for 1 hour
      
      res.json({
        success: true,
        message: 'Niche analysis retrieved successfully',
        data: analysis,
        cached: false
      });
      return;
    }

    // Perform new analysis
    logger.info(`Starting new analysis for niche: ${normalizedNiche}`);
    const newAnalysis = await instagramScraper.analyzeNiche(normalizedNiche);

    // Save to database
    if (analysis) {
      // Update existing analysis
      Object.assign(analysis, newAnalysis);
      await analysis.save();
    } else {
      // Create new analysis
      analysis = new NicheAnalysis(newAnalysis);
      await analysis.save();
    }

    // Cache the result
    await setCache(cacheKey, analysis, 3600);

    res.json({
      success: true,
      message: 'Niche analysis completed successfully',
      data: analysis,
      cached: false
    });
    return;

  } catch (error) {
    logger.error(`Error analyzing niche ${normalizedNiche}:`, error);
    res.status(500).json({
      success: false,
      message: 'Failed to analyze niche',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error'
    });
  }
}));

// Get trending hashtags
router.get('/trending-hashtags', optionalAuth, asyncHandler(async (req: Request, res: Response) => {
  const { niche, limit = 10 } = req.query;

  try {
    let hashtags;
    
    if (niche) {
      const analysis = await NicheAnalysis.findOne({ niche: niche.toString().toLowerCase() });
      hashtags = analysis?.trendingHashtags || [];
    } else {
      // Get hashtags from all analyses
      const analyses = await NicheAnalysis.find({}).limit(5);
      hashtags = analyses.flatMap(analysis => analysis.trendingHashtags);
    }

    // Sort by posts and limit
    hashtags = hashtags
      .sort((a, b) => b.posts - a.posts)
      .slice(0, parseInt(limit.toString()));

    res.json({
      success: true,
      message: 'Trending hashtags retrieved successfully',
      data: hashtags
    });

  } catch (error) {
    logger.error('Error retrieving trending hashtags:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve trending hashtags'
    });
  }
}));

// Get trending audios
router.get('/trending-audios', optionalAuth, asyncHandler(async (req: Request, res: Response) => {
  const { niche, limit = 10 } = req.query;

  try {
    let audios;
    
    if (niche) {
      const analysis = await NicheAnalysis.findOne({ niche: niche.toString().toLowerCase() });
      audios = analysis?.trendingAudios || [];
    } else {
      // Get audios from all analyses
      const analyses = await NicheAnalysis.find({}).limit(5);
      audios = analyses.flatMap(analysis => analysis.trendingAudios);
    }

    // Sort by plays and limit
    audios = audios
      .sort((a, b) => b.plays - a.plays)
      .slice(0, parseInt(limit.toString()));

    res.json({
      success: true,
      message: 'Trending audios retrieved successfully',
      data: audios
    });

  } catch (error) {
    logger.error('Error retrieving trending audios:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve trending audios'
    });
  }
}));

// Get top influencers
router.get('/top-influencers', optionalAuth, asyncHandler(async (req: Request, res: Response) => {
  const { niche, limit = 10 } = req.query;

  try {
    let influencers;
    
    if (niche) {
      const analysis = await NicheAnalysis.findOne({ niche: niche.toString().toLowerCase() });
      influencers = analysis?.topInfluencers || [];
    } else {
      // Get influencers from all analyses
      const analyses = await NicheAnalysis.find({}).limit(5);
      influencers = analyses.flatMap(analysis => analysis.topInfluencers);
    }

    // Sort by followers and limit
    influencers = influencers
      .sort((a, b) => b.followers - a.followers)
      .slice(0, parseInt(limit.toString()));

    res.json({
      success: true,
      message: 'Top influencers retrieved successfully',
      data: influencers
    });

  } catch (error) {
    logger.error('Error retrieving top influencers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve top influencers'
    });
  }
}));

// Get viral posts
router.get('/viral-posts', optionalAuth, asyncHandler(async (req: Request, res: Response) => {
  const { niche, limit = 10 } = req.query;

  try {
    let posts;
    
    if (niche) {
      const analysis = await NicheAnalysis.findOne({ niche: niche.toString().toLowerCase() });
      posts = analysis?.viralPosts || [];
    } else {
      // Get posts from all analyses
      const analyses = await NicheAnalysis.find({}).limit(5);
      posts = analyses.flatMap(analysis => analysis.viralPosts);
    }

    // Sort by likes and limit
    posts = posts
      .sort((a, b) => b.likes - a.likes)
      .slice(0, parseInt(limit.toString()));

    res.json({
      success: true,
      message: 'Viral posts retrieved successfully',
      data: posts
    });

  } catch (error) {
    logger.error('Error retrieving viral posts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve viral posts'
    });
  }
}));

// Refresh niche data (authenticated users only)
router.post('/refresh-niche', authenticateToken, asyncHandler(async (req: Request, res: Response): Promise<void> => {
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
    logger.info(`Refreshing analysis for niche: ${normalizedNiche}`);
    const newAnalysis = await instagramScraper.analyzeNiche(normalizedNiche);

    // Update database
    const analysis = await NicheAnalysis.findOneAndUpdate(
      { niche: normalizedNiche },
      newAnalysis,
      { upsert: true, new: true }
    );

    // Clear cache
    const cacheKey = `niche_analysis_${normalizedNiche}`;
    await setCache(cacheKey, analysis, 3600);

    res.json({
      success: true,
      message: 'Niche data refreshed successfully',
      data: analysis
    });

  } catch (error) {
    logger.error(`Error refreshing niche ${normalizedNiche}:`, error);
    res.status(500).json({
      success: false,
      message: 'Failed to refresh niche data'
    });
  }
}));

export default router;

