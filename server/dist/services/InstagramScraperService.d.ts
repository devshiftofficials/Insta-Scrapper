import { INicheAnalysis, IHashtagData, IAudioData, IInfluencerData, IViralPost } from '../types';
export declare class InstagramScraperService {
    private browser;
    private isLoggedIn;
    constructor();
    private initializeBrowser;
    login(username?: string, password?: string): Promise<boolean>;
    scrapeHashtagData(hashtag: string): Promise<IHashtagData[]>;
    scrapeAudioData(audioQuery: string): Promise<IAudioData[]>;
    scrapeInfluencerData(niche: string): Promise<IInfluencerData[]>;
    scrapeViralPosts(niche: string): Promise<IViralPost[]>;
    analyzeNiche(niche: string): Promise<INicheAnalysis>;
    close(): Promise<void>;
}
export declare const instagramScraper: InstagramScraperService;
//# sourceMappingURL=InstagramScraperService.d.ts.map