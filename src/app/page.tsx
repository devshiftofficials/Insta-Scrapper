'use client';

import { useState } from 'react';

interface SearchResults {
  niche: string;
  trendingHashtags: Array<{ tag: string; posts: string; trend: string }>;
  trendingAudios: Array<{ title: string; plays: string; trend: string }>;
  topInfluencers: Array<{ username: string; followers: string; engagement: string }>;
  bestPostingTimes: string[];
  contentIdeas: string[];
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('trending');
  const [searchNiche, setSearchNiche] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);

  const trendingAudios = [
    { id: 1, title: "Summer Vibes 2024", plays: "2.3M", trend: "+45%" },
    { id: 2, title: "Motivational Monday", plays: "1.8M", trend: "+32%" },
    { id: 3, title: "Workout Energy", plays: "1.5M", trend: "+28%" },
    { id: 4, title: "Chill Beats", plays: "1.2M", trend: "+15%" },
  ];

  const trendingHashtags = [
    { id: 1, tag: "#Summer2024", posts: "2.5M", trend: "+67%" },
    { id: 2, tag: "#Motivation", posts: "1.9M", trend: "+43%" },
    { id: 3, tag: "#Fitness", posts: "1.7M", trend: "+38%" },
    { id: 4, tag: "#Lifestyle", posts: "1.4M", trend: "+25%" },
  ];

  const viralPosts = [
    { id: 1, username: "@fitness_guru", likes: "125K", comments: "3.2K", shares: "8.9K" },
    { id: 2, username: "@travel_lover", likes: "98K", comments: "2.8K", shares: "6.7K" },
    { id: 3, username: "@food_artist", likes: "87K", comments: "2.1K", shares: "5.4K" },
    { id: 4, username: "@fashion_icon", likes: "76K", comments: "1.9K", shares: "4.8K" },
  ];

  const handleSearch = async () => {
    if (!searchNiche.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const results: SearchResults = {
        niche: searchNiche,
        trendingHashtags: [
          { tag: `#${searchNiche}2024`, posts: "1.2M", trend: "+67%" },
          { tag: `#${searchNiche}Life`, posts: "890K", trend: "+45%" },
          { tag: `#${searchNiche}Tips`, posts: "650K", trend: "+38%" },
        ],
        trendingAudios: [
          { title: `${searchNiche} Motivation`, plays: "1.8M", trend: "+52%" },
          { title: `${searchNiche} Vibes`, plays: "1.3M", trend: "+41%" },
        ],
        topInfluencers: [
          { username: `@${searchNiche}_expert`, followers: "2.1M", engagement: "8.5%" },
          { username: `@${searchNiche}_guru`, followers: "1.8M", engagement: "7.2%" },
        ],
        bestPostingTimes: ["9:00 AM", "1:00 PM", "7:00 PM"],
        contentIdeas: [
          `${searchNiche} transformation stories`,
          `${searchNiche} tips and tricks`,
          `${searchNiche} behind the scenes`,
        ]
      };
      setSearchResults(results);
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                InstaScraper Pro
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-pink-600 transition-colors">Features</a>
              <a href="#dashboard" className="text-gray-700 hover:text-pink-600 transition-colors">Dashboard</a>
              <a href="#roadmap" className="text-gray-700 hover:text-pink-600 transition-colors">Roadmap</a>
              <a href="#search" className="text-gray-700 hover:text-pink-600 transition-colors">Search</a>
            </div>
            <button className="gradient-primary text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fadeInUp">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-red-600 bg-clip-text text-transparent">
                Master Instagram
              </span>
              <br />
              <span className="text-gray-800">Growth & Analytics</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover trending audios, viral hashtags, and winning content strategies. 
              Get the roadmap to Instagram success with our professional analytics platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="gradient-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-pulse-slow">
                Start Free Trial
              </button>
              <button className="border-2 border-pink-600 text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-600 hover:text-white transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section id="search" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Discover Your Niche
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enter your niche or industry to get personalized Instagram insights, trending content, and growth strategies
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter your niche (e.g., fitness, travel, food, fashion)"
                  value={searchNiche}
                  onChange={(e) => setSearchNiche(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:outline-none text-lg transition-all duration-300"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isSearching || !searchNiche.trim()}
                className="gradient-primary text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSearching ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  'Analyze Niche'
                )}
              </button>
            </div>

            {searchResults && (
              <div className="space-y-8 animate-fadeInUp">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Insights for &quot;{searchResults.niche}&quot; Niche
                  </h3>
                  <p className="text-gray-600">Personalized data and recommendations</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <svg className="w-6 h-6 text-pink-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                      Trending Hashtags
                    </h4>
                    <div className="space-y-3">
                      {searchResults.trendingHashtags.map((hashtag, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                          <span className="font-medium text-blue-600">{hashtag.tag}</span>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">{hashtag.posts} posts</div>
                            <div className="text-sm text-green-600 font-semibold">{hashtag.trend}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                      Trending Audios
                    </h4>
                    <div className="space-y-3">
                      {searchResults.trendingAudios.map((audio, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                          <span className="font-medium">{audio.title}</span>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">{audio.plays} plays</div>
                            <div className="text-sm text-green-600 font-semibold">{audio.trend}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Top Influencers
                    </h4>
                    <div className="space-y-3">
                      {searchResults.topInfluencers.map((influencer, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                          <span className="font-medium">{influencer.username}</span>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">{influencer.followers} followers</div>
                            <div className="text-sm text-green-600 font-semibold">{influencer.engagement} engagement</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <svg className="w-6 h-6 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Best Posting Times
                    </h4>
                    <div className="space-y-3">
                      {searchResults.bestPostingTimes.map((time, index) => (
                        <div key={index} className="flex justify-center items-center p-3 bg-white rounded-lg shadow-sm">
                          <span className="font-medium text-orange-600">{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg className="w-6 h-6 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Content Ideas
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {searchResults.contentIdeas.map((idea, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
                        <span className="text-gray-700">{idea}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Powerful Features for Instagram Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to analyze trends, track performance, and grow your Instagram presence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Trending Audios</h3>
              <p className="text-gray-600 mb-6">
                Discover the most popular audio tracks and sounds that are driving engagement across Instagram.
              </p>
              <div className="space-y-3">
                {trendingAudios.slice(0, 2).map((audio) => (
                  <div key={audio.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{audio.title}</span>
                    <span className="text-sm text-green-600 font-semibold">{audio.trend}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Viral Hashtags</h3>
              <p className="text-gray-600 mb-6">
                Track trending hashtags and find the perfect tags to maximize your reach and engagement.
              </p>
              <div className="space-y-3">
                {trendingHashtags.slice(0, 2).map((hashtag) => (
                  <div key={hashtag.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-blue-600">{hashtag.tag}</span>
                    <span className="text-sm text-green-600 font-semibold">{hashtag.trend}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Viral Posts</h3>
              <p className="text-gray-600 mb-6">
                Analyze what makes content go viral and get insights into successful posting strategies.
              </p>
              <div className="space-y-3">
                {viralPosts.slice(0, 2).map((post) => (
                  <div key={post.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{post.username}</span>
                    <span className="text-sm text-red-600 font-semibold">{post.likes} likes</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section id="dashboard" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Real-Time Analytics Dashboard
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Monitor your Instagram performance with comprehensive analytics and insights
            </p>
          </div>

          <div className="bg-gray-900 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('trending')}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === 'trending' 
                      ? 'gradient-primary text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Trending
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === 'analytics' 
                      ? 'gradient-primary text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Analytics
                </button>
                <button
                  onClick={() => setActiveTab('insights')}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === 'insights' 
                      ? 'gradient-primary text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Insights
                </button>
              </div>
            </div>

            {activeTab === 'trending' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-800 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Top Trending Audios</h3>
                  <div className="space-y-4">
                    {trendingAudios.map((audio) => (
                      <div key={audio.id} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{audio.title}</p>
                          <p className="text-gray-400 text-sm">{audio.plays} plays</p>
                        </div>
                        <span className="text-green-400 font-semibold">{audio.trend}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Viral Hashtags</h3>
                  <div className="space-y-4">
                    {trendingHashtags.map((hashtag) => (
                      <div key={hashtag.id} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                        <div>
                          <p className="text-blue-400 font-medium">{hashtag.tag}</p>
                          <p className="text-gray-400 text-sm">{hashtag.posts} posts</p>
                        </div>
                        <span className="text-green-400 font-semibold">{hashtag.trend}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">2.3M</div>
                  <div className="text-gray-400">Total Reach</div>
                  <div className="text-green-400 text-sm mt-2">+15% this week</div>
                </div>
                <div className="bg-gray-800 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">45.2K</div>
                  <div className="text-gray-400">Engagement</div>
                  <div className="text-green-400 text-sm mt-2">+8% this week</div>
                </div>
                <div className="bg-gray-800 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">12.5%</div>
                  <div className="text-gray-400">Engagement Rate</div>
                  <div className="text-green-400 text-sm mt-2">+3% this week</div>
                </div>
              </div>
            )}

            {activeTab === 'insights' && (
              <div className="bg-gray-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Content Performance Insights</h3>
                <div className="space-y-4">
                  {viralPosts.map((post) => (
                    <div key={post.id} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{post.username}</p>
                        <p className="text-gray-400 text-sm">Viral content analysis</p>
                      </div>
                      <div className="flex space-x-6 text-sm">
                        <span className="text-red-400">{post.likes} likes</span>
                        <span className="text-blue-400">{post.comments} comments</span>
                        <span className="text-green-400">{post.shares} shares</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Your Instagram Success Roadmap
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow our proven strategy to grow your Instagram presence and maximize engagement
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Analyze Trends</h3>
              <p className="text-gray-600">
                Discover what&apos;s trending in your niche and identify opportunities for viral content.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6 animate-float" style={{animationDelay: '0.5s'}}>
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Create Content</h3>
              <p className="text-gray-600">
                Use trending audios and hashtags to create engaging content that resonates with your audience.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-float" style={{animationDelay: '1s'}}>
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Optimize Timing</h3>
              <p className="text-gray-600">
                Post at optimal times when your audience is most active for maximum reach and engagement.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-float" style={{animationDelay: '1.5s'}}>
                <span className="text-white font-bold text-2xl">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Track & Scale</h3>
              <p className="text-gray-600">
                Monitor performance metrics and scale successful strategies for continued growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Dominate Instagram?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of creators and brands who are already using InstaScraper Pro to grow their Instagram presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-pink-600 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">I</span>
                </div>
                <span className="text-xl font-bold">InstaScraper Pro</span>
              </div>
              <p className="text-gray-400">
                The ultimate Instagram analytics and growth platform for creators and brands.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#search" className="hover:text-white transition-colors">Niche Search</a></li>
                <li><a href="#dashboard" className="hover:text-white transition-colors">Analytics</a></li>
                <li><a href="#roadmap" className="hover:text-white transition-colors">Growth Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 InstaScraper Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}