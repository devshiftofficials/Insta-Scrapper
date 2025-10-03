'use client';

import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('trending');

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
              <a href="#pricing" className="text-gray-700 hover:text-pink-600 transition-colors">Pricing</a>
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
                Discover what's trending in your niche and identify opportunities for viral content.
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
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
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