// User related types
export interface IUser {
  _id?: string;
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  role: 'user' | 'admin' | 'premium';
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  preferences: {
    niches: string[];
    notifications: boolean;
    emailUpdates: boolean;
  };
}

export interface IUserCreate {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

// Instagram scraping types
export interface IHashtagData {
  tag: string;
  posts: number;
  trend: string;
  engagement: number;
  reach: number;
  lastUpdated: Date;
}

export interface IAudioData {
  title: string;
  plays: number;
  trend: string;
  duration: number;
  genre: string;
  lastUpdated: Date;
}

export interface IInfluencerData {
  username: string;
  followers: number;
  engagement: number;
  posts: number;
  category: string;
  verified: boolean;
  lastUpdated: Date;
}

export interface IViralPost {
  id: string;
  username: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  views?: number;
  hashtags: string[];
  audio?: string;
  postedAt: Date;
  category: string;
}

export interface INicheAnalysis {
  niche: string;
  trendingHashtags: IHashtagData[];
  trendingAudios: IAudioData[];
  topInfluencers: IInfluencerData[];
  viralPosts: IViralPost[];
  bestPostingTimes: string[];
  contentIdeas: string[];
  marketSize: number;
  competition: 'low' | 'medium' | 'high';
  lastUpdated: Date;
}

// API Response types
export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface IPaginatedResponse<T> extends IApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Scraping configuration types
export interface IScrapingConfig {
  maxConcurrentRequests: number;
  requestDelay: number;
  retryAttempts: number;
  timeout: number;
  userAgent: string;
  proxy?: string;
}

export interface IScrapingJob {
  id: string;
  type: 'hashtag' | 'audio' | 'influencer' | 'niche';
  target: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  startedAt: Date;
  completedAt?: Date;
  error?: string;
  result?: any;
}

// Authentication types
export interface IAuthToken {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface IAuthRequest extends Request {
  user?: IAuthToken;
}

// Rate limiting types
export interface IRateLimitInfo {
  limit: number;
  current: number;
  remaining: number;
  resetTime: Date;
}

// Cache types
export interface ICacheOptions {
  ttl?: number; // Time to live in seconds
  key: string;
  tags?: string[];
}

// Error types
export interface IAppError extends Error {
  statusCode: number;
  isOperational: boolean;
  code?: string;
}

