## Inspiration

I developed this fullstack social media web app to hone my knowledge of the MERN stack along with Next.js. Initially, I decided to go with Next's default server option. Then, I went with the custom Express server since that allowed me to use WebSockets (Socket.io) in my app for realtime chats. Besides, this is a simple social media web app.

Please give this repository a ⭐ if you liked this app. It seems like a little thing, but it helps a lot with the motivation.

## Technologies used

- React
- Next.js
- Node.js
- Express.js
- MongoDB
- Redux
- Socket.io
- TailwindCSS
- Cloudinary
- NodeMailer

## Features

### ✅ **Core Features**
- User authentication with JWT
- User profile management
- User posts with images
- User followers and following system
- User likes and comments
- Real-time notifications
- Real-time chat system
- User search functionality
- Dark mode support
- Password reset system
- Settings page with profile management

### 🎭 **Advanced Social Features**
- **Post Reactions** - 6 reaction types (like, love, laugh, wow, sad, angry) with emoji picker
- **Post Bookmarks** - Save posts for later viewing with dedicated bookmarks page
- **Hashtag System** - Automatic hashtag extraction, trending hashtags, and hashtag-based filtering
- **User Mentions** - @username mentions in posts and comments with automatic linking
- **Advanced Search** - Comprehensive search across users, posts, and hashtags with filters
- **User Blocking** - Block users and hide their content from feeds
- **Content Reporting** - Report inappropriate content with admin review system

### 🔧 **Technical Features**
- **Real-time Communication** - Socket.io for live chats and notifications
- **Image Upload** - Cloudinary integration for profile pictures and post images
- **Email System** - Nodemailer for password reset and notifications
- **Responsive Design** - Mobile-first design with TailwindCSS
- **State Management** - Redux for global state management
- **API Architecture** - RESTful API with Express.js
- **Database** - MongoDB with Mongoose ODM

## Installation

1. Clone the repository
```bash
git clone https://github.com/54nd339/Social.git
```
2. Install the dependencies
```bash
npm install
```
3. Run the app in development mode
```bash
npm run dev
```

## Project Structure

```
├── api/                    # API routes
│   ├── auth.js            # Authentication endpoints
│   ├── posts.js           # Post management (CRUD, reactions, bookmarks)
│   ├── profile.js         # User profile management
│   ├── search.js          # Search functionality
│   ├── block.js           # User blocking system
│   ├── reports.js         # Content reporting
│   └── forgot-password.js # Password reset
├── components/            # React components
│   ├── ReactionPicker.js  # Post reaction system
│   ├── ReactionDisplay.js # Reaction count display
│   ├── BlockUserButton.js # User blocking interface
│   ├── ReportButton.js    # Content reporting
│   └── HelperComponents/  # Reusable UI components
├── models/                # Database models
│   ├── UserModel.js       # User schema
│   ├── PostModel.js       # Post schema with reactions
│   └── ReportModel.js     # Report schema
├── pages/                 # Next.js pages
│   ├── search.js          # Advanced search page
│   ├── bookmarks.js       # Saved posts page
│   ├── hashtag/[hashtag].js # Hashtag pages
│   └── settings.js        # User settings
├── utils/                 # Utility functions
│   └── hashtagUtils.js    # Hashtag processing
└── contexts/              # React contexts
    └── ThemeContext.js    # Dark mode management
```

## API Endpoints

### Authentication
- `POST /api/auth` - Login
- `POST /api/signup` - Register
- `POST /api/forgot-password/request` - Request password reset
- `POST /api/forgot-password/reset` - Reset password

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create post
- `POST /api/posts/like/:postId` - Like post
- `POST /api/posts/reaction/:postId` - Add reaction
- `POST /api/posts/bookmark/:postId` - Bookmark post
- `GET /api/posts/bookmarks` - Get bookmarked posts
- `GET /api/posts/hashtag/:hashtag` - Get posts by hashtag
- `GET /api/posts/trending/hashtags` - Get trending hashtags

### Search & Discovery
- `GET /api/search/:searchTerm` - Search users
- `GET /api/posts/search` - Search posts
- `GET /api/posts/trending/hashtags` - Trending hashtags

### User Management
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile
- `POST /api/block/:userId` - Block user
- `DELETE /api/block/:userId` - Unblock user
- `GET /api/block` - Get blocked users

### Content Moderation
- `POST /api/reports` - Report content
- `GET /api/reports` - Get reports (admin)
- `PUT /api/reports/:reportId` - Update report status

## Current Status

### 🎯 **Development Progress**
- **✅ Core Features**: 100% Complete
- **✅ Advanced Social Features**: 100% Complete  
- **✅ User Safety Features**: 100% Complete
- **✅ Search & Discovery**: 100% Complete
- **🔄 Security Features**: 0% Complete (Next Priority)
- **🔄 Analytics Features**: 0% Complete
- **🔄 Performance Optimization**: 0% Complete

### 📊 **Feature Statistics**
- **Total Features**: 50+ implemented
- **API Endpoints**: 25+ endpoints
- **React Components**: 15+ new components
- **Database Models**: 3 enhanced models
- **Pages**: 5+ new pages

### 🚀 **Next Development Phase**
The next development phase will focus on:
1. **Security Enhancements** - 2FA, email verification, enhanced security
2. **Analytics & Insights** - Post analytics, user engagement metrics
3. **Performance Optimization** - Caching, CDN, database optimization
4. **Mobile Experience** - PWA, mobile app, responsive improvements

## To-do

### ✅ **Recently Completed Features**
- [x] **Post Reactions** - 6 reaction types (like, love, laugh, wow, sad, angry) with emoji picker
- [x] **Post Bookmarks** - Save posts for later viewing with dedicated bookmarks page
- [x] **Hashtag System** - Automatic hashtag extraction, trending hashtags, and hashtag-based filtering
- [x] **User Mentions** - @username mentions in posts and comments with automatic linking
- [x] **Advanced Search** - Comprehensive search across users, posts, and hashtags with filters
- [x] **User Blocking** - Block users and hide their content from feeds
- [x] **Content Reporting** - Report inappropriate content with admin review system
- [x] **Dark Mode** - Complete dark mode implementation with theme context
- [x] **Password Reset** - Forgot password functionality with email verification
- [x] **Settings Page** - Comprehensive settings with profile, password, and notification management

### 🚀 **High Priority Features**

#### **Content & Engagement**
- [ ] **Post Sharing** - Share posts to external platforms
- [ ] **Post Scheduling** - Schedule posts for future publication
- [ ] **Post Drafts** - Save posts as drafts before publishing
- [ ] **Post Analytics** - View post engagement metrics (views, likes, comments)
- [ ] **Post Polls** - Create interactive polls in posts
- [ ] **Post Stories** - Instagram-style stories with 24-hour expiration

#### **Advanced Social Features**
- [ ] **Groups/Communities** - Create and join interest-based groups
- [ ] **Events** - Create and manage social events
- [ ] **Live Streaming** - Real-time video streaming capabilities
- [ ] **Video Calls** - One-on-one and group video calling
- [ ] **Voice Messages** - Send voice notes in chats
- [ ] **File Sharing** - Share documents, PDFs, and other files
- [ ] **Location Sharing** - Share current location or check-ins

#### **User Experience**
- [ ] **Content Discovery** - Algorithm-based content recommendations
- [ ] **User Verification** - Blue checkmark for verified accounts
- [ ] **User Privacy Controls** - Granular privacy settings
- [ ] **Account Deactivation** - Temporarily deactivate account
- [ ] **Data Export** - Export user data (GDPR compliance)

### 🔧 **Technical Improvements**

#### **Performance & Optimization**
- [ ] **Image Optimization** - WebP format, lazy loading, responsive images
- [ ] **Caching Strategy** - Redis caching for frequently accessed data
- [ ] **CDN Integration** - Content delivery network for global performance
- [ ] **Database Indexing** - Optimize MongoDB queries with proper indexes
- [ ] **API Rate Limiting** - Prevent abuse with rate limiting
- [ ] **Pagination Optimization** - Efficient data loading for large datasets
- [ ] **Bundle Optimization** - Code splitting and tree shaking
- [ ] **Service Worker** - Offline functionality and caching

#### **Security & Data Protection**
- [ ] **Two-Factor Authentication** - 2FA for enhanced security
- [ ] **Email Verification** - Verify email addresses on signup
- [ ] **Password Strength Meter** - Real-time password validation
- [ ] **Account Lockout** - Lock accounts after failed login attempts
- [ ] **Session Management** - Secure session handling and timeout
- [ ] **Input Sanitization** - Prevent XSS attacks
- [ ] **SQL Injection Prevention** - Secure database queries
- [ ] **HTTPS Enforcement** - Force secure connections
- [ ] **Content Security Policy** - CSP headers for security

#### **Mobile & PWA**
- [ ] **Progressive Web App** - PWA capabilities with offline support
- [ ] **Push Notifications** - Browser push notifications
- [ ] **Mobile App** - React Native mobile application
- [ ] **Responsive Design** - Complete mobile optimization
- [ ] **Touch Gestures** - Swipe, pinch, and touch interactions
- [ ] **App Install Prompts** - Install app on mobile devices

### 📊 **Analytics & Admin**

#### **User Analytics**
- [ ] **User Dashboard** - Personal analytics and insights
- [ ] **Engagement Metrics** - Track user engagement patterns
- [ ] **Content Performance** - Analyze post and profile performance
- [ ] **Follower Analytics** - Track follower growth and demographics
- [ ] **Activity Timeline** - User activity history and patterns

#### **Admin Panel**
- [ ] **Admin Dashboard** - Comprehensive admin interface
- [ ] **User Management** - Manage users, roles, and permissions
- [ ] **Content Moderation** - Review and moderate reported content
- [ ] **System Analytics** - Platform-wide analytics and metrics
- [ ] **Bulk Operations** - Bulk user and content management
- [ ] **System Health** - Monitor server and database performance
- [ ] **Backup System** - Automated data backup and recovery

### 🌐 **Advanced Features**

#### **AI & Machine Learning**
- [ ] **Content Recommendation** - AI-powered content suggestions
- [ ] **Spam Detection** - Automatic spam and bot detection
- [ ] **Content Moderation** - AI-powered content filtering
- [ ] **Sentiment Analysis** - Analyze post and comment sentiment
- [ ] **Auto-tagging** - Automatic content categorization
- [ ] **Smart Notifications** - Intelligent notification filtering

#### **Integration & APIs**
- [ ] **Third-party Integrations** - Connect with external services
- [ ] **Social Media Import** - Import content from other platforms
- [ ] **API Documentation** - Comprehensive API documentation
- [ ] **Webhook System** - Real-time event notifications
- [ ] **OAuth Integration** - Login with Google, Facebook, etc.
- [ ] **Calendar Integration** - Sync with calendar applications

#### **Communication**
- [ ] **Email Notifications** - Comprehensive email notification system
- [ ] **SMS Notifications** - SMS alerts for important events
- [ ] **In-app Messaging** - Enhanced messaging system
- [ ] **Group Chats** - Multi-user chat rooms
- [ ] **Chat Encryption** - End-to-end message encryption
- [ ] **Message Reactions** - React to messages with emojis

### 🎨 **UI/UX Enhancements**

#### **Design System**
- [ ] **Component Library** - Reusable UI component system
- [ ] **Design Tokens** - Consistent design language
- [ ] **Accessibility** - WCAG compliance and screen reader support
- [ ] **Internationalization** - Multi-language support
- [ ] **Theme Customization** - User-customizable themes
- [ ] **Animation System** - Smooth micro-interactions

#### **User Interface**
- [ ] **Drag & Drop** - File upload with drag and drop
- [ ] **Keyboard Shortcuts** - Power user keyboard navigation
- [ ] **Bulk Actions** - Select and manage multiple items
- [ ] **Advanced Filters** - Complex search and filter options
- [ ] **Customizable Dashboard** - Personalized user interface
- [ ] **Accessibility Tools** - Screen reader and accessibility features

### 🔧 **Development & DevOps**

#### **Code Quality**
- [ ] **TypeScript Migration** - Convert to TypeScript for better type safety
- [ ] **Unit Testing** - Comprehensive test coverage
- [ ] **Integration Testing** - End-to-end testing
- [ ] **Code Documentation** - Comprehensive code documentation
- [ ] **API Testing** - Automated API testing
- [ ] **Performance Testing** - Load and stress testing

#### **Deployment & Monitoring**
- [ ] **Docker Optimization** - Multi-stage Docker builds
- [ ] **CI/CD Pipeline** - Automated testing and deployment
- [ ] **Monitoring System** - Application performance monitoring
- [ ] **Error Tracking** - Comprehensive error logging and tracking
- [ ] **Health Checks** - System health monitoring
- [ ] **Logging System** - Structured logging and analysis