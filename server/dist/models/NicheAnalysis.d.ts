import mongoose, { Document } from 'mongoose';
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
export declare const NicheAnalysis: mongoose.Model<INicheAnalysisDocument, {}, {}, {}, mongoose.Document<unknown, {}, INicheAnalysisDocument, {}, {}> & INicheAnalysisDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=NicheAnalysis.d.ts.map