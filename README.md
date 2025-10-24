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

- User authentication
- User profile
- User posts
- User followers
- User following
- User likes
- User comments
- User notifications
- User chats
- User search

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

## To-do

### 🚀 **High Priority Features**

#### **Content & Engagement**
- [ ] **Post Sharing** - Share posts to external platforms
- [ ] **Post Reactions** - Add more reaction types beyond likes (love, laugh, angry, sad)
- [ ] **Post Bookmarks/Saves** - Save posts for later viewing
- [ ] **Post Scheduling** - Schedule posts for future publication
- [ ] **Post Drafts** - Save posts as drafts before publishing
- [ ] **Post Analytics** - View post engagement metrics (views, likes, comments)
- [ ] **Post Categories/Tags** - Categorize posts with hashtags or tags
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
- [ ] **User Mentions** - @username mentions in posts and comments
- [ ] **Hashtag System** - Clickable hashtags with trending topics

#### **User Experience**
- [ ] **Advanced Search** - Search posts, users, and content with filters
- [ ] **Content Discovery** - Algorithm-based content recommendations
- [ ] **Trending Topics** - Show trending hashtags and topics
- [ ] **User Verification** - Blue checkmark for verified accounts
- [ ] **User Blocking** - Block users and hide their content
- [ ] **Content Reporting** - Report inappropriate content
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