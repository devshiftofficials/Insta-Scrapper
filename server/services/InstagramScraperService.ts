import puppeteer, { Browser, Page } from 'puppeteer';
import axios from 'axios';
import { logger } from '../utils/logger';
import { INicheAnalysis, IHashtagData, IAudioData, IInfluencerData, IViralPost } from '../types';

export class InstagramScraperService {
  private browser: Browser | null = null;
  private isLoggedIn = false;

  constructor() {
    this.initializeBrowser();
  }

  private async initializeBrowser(): Promise<void> {
    try {
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ]
      });
      logger.info('Browser initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize browser:', error);
      throw error;
    }
  }

  async login(username?: string, password?: string): Promise<boolean> {
    if (!this.browser) {
      throw new Error('Browser not initialized');
    }

    try {
      const page = await this.browser.newPage();
      
      // Set user agent to avoid detection
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      // Navigate to Instagram login page
      await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle2' });
      
      // Wait for login form
      await page.waitForSelector('input[name="username"]');
      
      // Fill login form
      await page.type('input[name="username"]', username || process.env.INSTAGRAM_USERNAME || '');
      await page.type('input[name="password"]', password || process.env.INSTAGRAM_PASSWORD || '');
      
      // Click login button
      await page.click('button[type="submit"]');
      
      // Wait for navigation
      await page.waitForNavigation({ waitUntil: 'networkidle2' });
      
      // Check if login was successful
      const currentUrl = page.url();
      if (currentUrl.includes('/accounts/login/')) {
        logger.error('Login failed');
        await page.close();
        return false;
      }
      
      this.isLoggedIn = true;
      await page.close();
      logger.info('Successfully logged in to Instagram');
      return true;
      
    } catch (error) {
      logger.error('Login error:', error);
      return false;
    }
  }

  async scrapeHashtagData(hashtag: string): Promise<IHashtagData[]> {
    if (!this.browser || !this.isLoggedIn) {
      throw new Error('Browser not initialized or not logged in');
    }

    try {
      const page = await this.browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
      
      const url = `https://www.instagram.com/explore/tags/${hashtag}/`;
      await page.goto(url, { waitUntil: 'networkidle2' });
      
      // Wait for content to load
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Extract hashtag data
      const hashtagData = await page.evaluate(() => {
        const postsElement = document.querySelector('span[title]');
        const postsText = postsElement?.getAttribute('title') || '0';
        const posts = parseInt(postsText.replace(/,/g, '')) || 0;
        
        return {
          tag: (window as any).location.pathname.split('/')[2],
          posts,
          trend: '+0%', // This would need historical data to calculate
          engagement: 0,
          reach: 0,
          lastUpdated: new Date()
        };
      });
      
      await page.close();
      return [hashtagData];
      
    } catch (error) {
      logger.error(`Error scraping hashtag ${hashtag}:`, error);
      throw error;
    }
  }

  async scrapeAudioData(audioQuery: string): Promise<IAudioData[]> {
    // This is a simplified implementation
    // In a real scenario, you'd need to scrape audio data from Instagram's audio library
    return [
      {
        title: `${audioQuery} Motivation`,
        plays: Math.floor(Math.random() * 2000000) + 100000,
        trend: `+${Math.floor(Math.random() * 50) + 10}%`,
        duration: Math.floor(Math.random() * 60) + 30,
        genre: 'Motivational',
        lastUpdated: new Date()
      },
      {
        title: `${audioQuery} Vibes`,
        plays: Math.floor(Math.random() * 1500000) + 50000,
        trend: `+${Math.floor(Math.random() * 40) + 5}%`,
        duration: Math.floor(Math.random() * 45) + 15,
        genre: 'Chill',
        lastUpdated: new Date()
      }
    ];
  }

  async scrapeInfluencerData(niche: string): Promise<IInfluencerData[]> {
    // This is a simplified implementation
    // In a real scenario, you'd scrape actual influencer data
    return [
      {
        username: `@${niche}_expert`,
        followers: Math.floor(Math.random() * 3000000) + 500000,
        engagement: Math.random() * 10 + 5,
        posts: Math.floor(Math.random() * 1000) + 100,
        category: niche,
        verified: Math.random() > 0.5,
        lastUpdated: new Date()
      },
      {
        username: `@${niche}_guru`,
        followers: Math.floor(Math.random() * 2500000) + 300000,
        engagement: Math.random() * 8 + 4,
        posts: Math.floor(Math.random() * 800) + 50,
        category: niche,
        verified: Math.random() > 0.7,
        lastUpdated: new Date()
      }
    ];
  }

  async scrapeViralPosts(niche: string): Promise<IViralPost[]> {
    // This is a simplified implementation
    // In a real scenario, you'd scrape actual viral posts
    return [
      {
        id: `post_${Date.now()}_1`,
        username: `@${niche}_creator`,
        caption: `Amazing ${niche} content that's going viral! #${niche} #viral #trending`,
        likes: Math.floor(Math.random() * 100000) + 10000,
        comments: Math.floor(Math.random() * 5000) + 500,
        shares: Math.floor(Math.random() * 2000) + 100,
        views: Math.floor(Math.random() * 500000) + 50000,
        hashtags: [`#${niche}`, '#viral', '#trending'],
        audio: `${niche} Vibes`,
        postedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        category: niche
      }
    ];
  }

  async analyzeNiche(niche: string): Promise<INicheAnalysis> {
    try {
      logger.info(`Starting niche analysis for: ${niche}`);
      
      const [hashtags, audios, influencers, viralPosts] = await Promise.all([
        this.scrapeHashtagData(niche),
        this.scrapeAudioData(niche),
        this.scrapeInfluencerData(niche),
        this.scrapeViralPosts(niche)
      ]);

      const analysis: INicheAnalysis = {
        niche: niche.toLowerCase(),
        trendingHashtags: hashtags,
        trendingAudios: audios,
        topInfluencers: influencers,
        viralPosts,
        bestPostingTimes: ['9:00 AM', '1:00 PM', '7:00 PM'],
        contentIdeas: [
          `${niche} transformation stories`,
          `${niche} tips and tricks`,
          `${niche} behind the scenes`,
          `${niche} day in the life`,
          `${niche} before and after`
        ],
        marketSize: Math.floor(Math.random() * 10000000) + 1000000,
        competition: Math.random() > 0.5 ? 'high' : Math.random() > 0.3 ? 'medium' : 'low',
        lastUpdated: new Date()
      };

      logger.info(`Niche analysis completed for: ${niche}`);
      return analysis;
      
    } catch (error) {
      logger.error(`Error analyzing niche ${niche}:`, error);
      throw error;
    }
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.isLoggedIn = false;
      logger.info('Browser closed');
    }
  }
}

// Singleton instance
export const instagramScraper = new InstagramScraperService();

