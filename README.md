# Instagram Scraper - Full Stack Application

A complete Instagram analytics and niche analysis platform with a beautiful Next.js frontend and robust Node.js backend API.

## 🚀 Project Structure

```
insta_scraper/
├── src/                    # Next.js Frontend
│   └── app/               # App Router pages
├── server/                # Node.js Backend API
│   ├── middleware/         # Auth, error handling
│   ├── models/           # Database models
│   ├── routes/           # API endpoints
│   ├── services/         # Business logic
│   ├── utils/            # Utilities
│   └── types/            # TypeScript types
├── public/               # Static assets
└── package.json         # Unified dependencies
```

## ✨ Features

### Frontend (Next.js)
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Niche Search**: Interactive search for Instagram insights
- **Real-time Analytics**: Dashboard with trending data
- **Professional Animations**: Smooth transitions and effects
- **Mobile Responsive**: Works perfectly on all devices

### Backend (Node.js + Express)
- **Instagram Scraping**: Extract trending hashtags, audios, influencers
- **Niche Analysis**: Comprehensive industry analysis
- **User Authentication**: JWT-based auth with role management
- **Data Storage**: MongoDB with Mongoose ODM
- **Caching**: Redis for performance optimization
- **Rate Limiting**: API protection and abuse prevention
- **Security**: Helmet, CORS, input validation

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.4** with App Router
- **React 19.1.0** with TypeScript
- **Tailwind CSS v4** for styling
- **Modern animations** and transitions

### Backend
- **Node.js** with TypeScript
- **Express.js** web framework
- **MongoDB** with Mongoose
- **Redis** for caching
- **Puppeteer** for web scraping
- **JWT** authentication
- **bcryptjs** password hashing

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/devshiftofficials/Insta-Scrapper.git
   cd insta_scraper
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   NODE_ENV=development
   PORT=5000
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/insta_scraper
   REDIS_URL=redis://localhost:6379
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   
   # Instagram (for scraping)
   INSTAGRAM_USERNAME=your-username
   INSTAGRAM_PASSWORD=your-password
   
   # CORS
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Start databases**
   ```bash
   # MongoDB
   mongod
   
   # Redis
   redis-server
   ```

## 🚀 Running the Application

### Development Mode
```bash
# Run both frontend and backend
npm run dev:full

# Or run separately
npm run dev          # Frontend only (port 3000)
npm run server:dev   # Backend only (port 5000)
```

### Production Mode
```bash
# Build both frontend and backend
npm run build:full

# Start both
npm run start:full
```

### Individual Commands
```bash
# Frontend
npm run dev          # Development
npm run build        # Build
npm start            # Production

# Backend
npm run server:dev   # Development
npm run server:build # Build
npm run server:start # Production
```

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/profile` - Get user profile
- `PUT /api/v1/auth/profile` - Update profile
- `PUT /api/v1/auth/change-password` - Change password

### Scraping & Analysis
- `POST /api/v1/scraper/analyze-niche` - Analyze specific niche
- `GET /api/v1/scraper/trending-hashtags` - Get trending hashtags
- `GET /api/v1/scraper/trending-audios` - Get trending audios
- `GET /api/v1/scraper/top-influencers` - Get top influencers
- `GET /api/v1/scraper/viral-posts` - Get viral posts

### Analytics
- `GET /api/v1/analytics/dashboard` - Dashboard data
- `GET /api/v1/analytics/niche-performance/:niche` - Niche performance
- `GET /api/v1/analytics/recommendations` - Content recommendations
- `GET /api/v1/analytics/market-insights` - Market insights

### User Management
- `GET /api/v1/user/preferences` - Get user preferences
- `PUT /api/v1/user/preferences` - Update preferences
- `POST /api/v1/user/preferences/niches` - Add niche
- `DELETE /api/v1/user/preferences/niches/:niche` - Remove niche

## 🔧 Configuration

### Frontend Configuration
- **Next.js**: Configured with Turbopack for fast development
- **Tailwind CSS**: Custom animations and gradients
- **TypeScript**: Strict type checking enabled

### Backend Configuration
- **Express**: Security middleware (Helmet, CORS, Rate Limiting)
- **MongoDB**: Optimized indexes and schemas
- **Redis**: Connection pooling and error handling
- **Puppeteer**: Headless browser configuration

## 🗄️ Database Models

### User
```typescript
{
  email: string
  password: string (hashed)
  username: string
  firstName: string
  lastName: string
  role: 'user' | 'admin' | 'premium'
  preferences: {
    niches: string[]
    notifications: boolean
    emailUpdates: boolean
  }
}
```

### NicheAnalysis
```typescript
{
  niche: string
  trendingHashtags: HashtagData[]
  trendingAudios: AudioData[]
  topInfluencers: InfluencerData[]
  viralPosts: ViralPost[]
  bestPostingTimes: string[]
  contentIdeas: string[]
  marketSize: number
  competition: 'low' | 'medium' | 'high'
}
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcryptjs with salt rounds
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Request sanitization
- **CORS Protection**: Configured origins
- **Helmet**: Security headers
- **Error Handling**: Comprehensive error management

## 📊 Performance Features

- **Redis Caching**: Cache frequently accessed data
- **Database Indexing**: Optimized queries
- **Compression**: Response compression
- **Connection Pooling**: Efficient database connections
- **Static Generation**: Next.js static optimization

## 🚀 Deployment

### Vercel (Frontend)
1. Connect GitHub repository
2. Deploy automatically on push
3. Environment variables configured

### Backend Deployment
```bash
# Using PM2
npm install -g pm2
npm run server:build
pm2 start server/dist/index.js --name "insta-scraper-api"

# Using Docker
docker build -t insta-scraper .
docker run -p 5000:5000 insta-scraper
```

### Environment Setup
- MongoDB Atlas or local instance
- Redis Cloud or local instance
- Environment variables configured

## 📝 Usage Examples

### Analyze a Niche
```bash
curl -X POST http://localhost:5000/api/v1/scraper/analyze-niche \
  -H "Content-Type: application/json" \
  -d '{"niche": "fitness"}'
```

### Get Trending Hashtags
```bash
curl -X GET "http://localhost:5000/api/v1/scraper/trending-hashtags?niche=fitness&limit=10"
```

### User Registration
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "username": "username",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

## 🔍 Monitoring & Logging

- **File Logging**: Logs saved to `server/logs/` directory
- **Error Tracking**: Comprehensive error logging
- **Performance Monitoring**: Request timing and metrics
- **Health Checks**: `/health` endpoint for monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🎯 Roadmap

- [ ] Real Instagram API integration
- [ ] Advanced analytics dashboard
- [ ] Content scheduling features
- [ ] Team collaboration tools
- [ ] Mobile app development
- [ ] AI-powered insights

---

**Built with ❤️ by DevShift Team**