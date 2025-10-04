import mongoose, { Schema, Document } from 'mongoose';

export interface INicheAnalysisDocument extends Document {
  niche: string;
  trendingHashtags: Array<{
    tag: string;
    posts: number;
    trend: string;
    engagement: number;
    reach: number;
    lastUpdated: Date;
  }>;
  trendingAudios: Array<{
    title: string;
    plays: number;
    trend: string;
    duration: number;
    genre: string;
    lastUpdated: Date;
  }>;
  topInfluencers: Array<{
    username: string;
    followers: number;
    engagement: number;
    posts: number;
    category: string;
    verified: boolean;
    lastUpdated: Date;
  }>;
  viralPosts: Array<{
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
  }>;
  bestPostingTimes: string[];
  contentIdeas: string[];
  marketSize: number;
  competition: 'low' | 'medium' | 'high';
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NicheAnalysisSchema = new Schema<INicheAnalysisDocument>({
  niche: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  trendingHashtags: [{
    tag: {
      type: String,
      required: true
    },
    posts: {
      type: Number,
      required: true
    },
    trend: {
      type: String,
      required: true
    },
    engagement: {
      type: Number,
      default: 0
    },
    reach: {
      type: Number,
      default: 0
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  }],
  trendingAudios: [{
    title: {
      type: String,
      required: true
    },
    plays: {
      type: Number,
      required: true
    },
    trend: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 0
    },
    genre: {
      type: String,
      default: 'Unknown'
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  }],
  topInfluencers: [{
    username: {
      type: String,
      required: true
    },
    followers: {
      type: Number,
      required: true
    },
    engagement: {
      type: Number,
      required: true
    },
    posts: {
      type: Number,
      default: 0
    },
    category: {
      type: String,
      default: 'General'
    },
    verified: {
      type: Boolean,
      default: false
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  }],
  viralPosts: [{
    id: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      required: true
    },
    comments: {
      type: Number,
      required: true
    },
    shares: {
      type: Number,
      required: true
    },
    views: {
      type: Number
    },
    hashtags: [{
      type: String
    }],
    audio: {
      type: String
    },
    postedAt: {
      type: Date,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  }],
  bestPostingTimes: [{
    type: String
  }],
  contentIdeas: [{
    type: String
  }],
  marketSize: {
    type: Number,
    default: 0
  },
  competition: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
NicheAnalysisSchema.index({ niche: 1 });
NicheAnalysisSchema.index({ lastUpdated: -1 });
NicheAnalysisSchema.index({ createdAt: -1 });

export const NicheAnalysis = mongoose.model<INicheAnalysisDocument>('NicheAnalysis', NicheAnalysisSchema);

