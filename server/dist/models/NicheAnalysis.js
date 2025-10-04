"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NicheAnalysis = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const NicheAnalysisSchema = new mongoose_1.Schema({
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
NicheAnalysisSchema.index({ niche: 1 });
NicheAnalysisSchema.index({ lastUpdated: -1 });
NicheAnalysisSchema.index({ createdAt: -1 });
exports.NicheAnalysis = mongoose_1.default.model('NicheAnalysis', NicheAnalysisSchema);
//# sourceMappingURL=NicheAnalysis.js.map