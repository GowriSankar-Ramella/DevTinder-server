# DevTinder Backend 🔥

A comprehensive backend API for DevTinder - a developer-focused networking platform where developers can connect, chat, and build meaningful professional relationships.

## 🚀 Features

### 🔐 Authentication & Authorization

- **User Signup/Login** with JWT-based authentication
- **Secure password hashing** using bcrypt
- **Cookie-based session management**
- **Protected routes** with middleware authentication
- **Email notifications** on successful registration using AWS SES

### 👤 Profile Management

- **Complete user profiles** with professional information
- **Profile fields**: Name, skills, about, photo, age, location, company, experience, GitHub, LinkedIn
- **Profile validation** and data sanitization
- **Update profile** with field-level validation

### 🤝 Connection System

- **Smart matching algorithm** - users only see new profiles in their feed
- **Multiple interaction types**:
  - 👍 **Interested** - Express interest in connecting
  - 👎 **Ignored** - Pass on a profile
  - ⭐ **Saved** - Save for later review
- **Connection requests** - Accept/reject interested requests
- **Mutual connections** - Build your professional network
- **Duplicate request prevention**

### 💬 Real-time Chat

- **Socket.IO integration** for real-time messaging
- **Private chat rooms** between connected users
- **Online/offline status** tracking
- **Message persistence** in MongoDB
- **Chat history** retrieval
- **Auto-generated initial messages**

### 📊 User Dashboard

- **Feed**: Discover new developers
- **Requests**: Manage incoming connection requests
- **Connections**: View your network
- **Saved**: Review saved profiles
- **Active chats**: Real-time messaging interface

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.IO
- **Email Service**: AWS SES
- **Password Security**: bcrypt
- **Validation**: validator.js
- **Environment**: dotenv

## 📁 Project Structure

```
src/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authControllers.js    # Authentication logic
│   ├── profileControllers.js # Profile management
│   ├── requestControllers.js # Connection requests
│   ├── userControllers.js    # User data & feed
│   └── chatControllers.js    # Chat functionality
├── middleware/
│   └── auth.middleware.js    # JWT authentication
├── models/
│   ├── User.model.js         # User schema
│   ├── Connection.model.js   # Connection requests schema
│   └── Chat.model.js         # Chat & messages schema
├── routes/
│   ├── authRoutes.js         # Authentication routes
│   ├── profileRoutes.js      # Profile routes
│   ├── requestRoutes.js      # Connection routes
│   ├── userRoutes.js         # User data routes
│   └── chatRoutes.js         # Chat routes
├── utils/
│   ├── ApiResponse.js        # Standardized API responses
│   ├── validateData.js       # Data validation helpers
│   ├── sendEmail.js          # Email service
│   ├── sesClient.js          # AWS SES configuration
│   └── socket.js             # Socket.IO setup
└── index.js                  # Application entry point
```

## 🔗 API Endpoints

### Authentication

```
POST /auth/signup          # Register new user
POST /auth/login           # User login
GET  /auth/logout          # User logout
```

### Profile Management

```
GET   /profile/view        # Get user profile
PATCH /profile/update      # Update profile
```

### Connection System

```
POST /request/send/interested/:receiverId    # Send interest
POST /request/send/ignored/:receiverId       # Ignore profile
POST /request/send/saved/:receiverId         # Save profile
POST /request/review/accepted/:requestId     # Accept request
POST /request/review/rejected/:requestId     # Reject request
```

### User Data

```
GET /user/feed                 # Get discovery feed
GET /user/requests/received    # Get pending requests
GET /user/connections          # Get connections
GET /user/saved               # Get saved profiles
```

### Chat System

```
GET /chat/all                    # Get all chats
GET /chat/:targetUserId          # Get chat history
GET /chat/initialize/:targetUserId # Initialize new chat
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- AWS SES credentials (for email)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd devTinder_backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file with:

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=your_aws_region
   ```

4. **Start the server**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:3000`

## 🔧 Key Features Implementation

### Smart Feed Algorithm

- Filters out users you've already interacted with
- Excludes your own profile
- Provides fresh profiles for discovery

### Real-time Features

- Live online/offline status
- Instant message delivery
- Multi-tab support for same user
- Automatic room management

### Security Features

- Password strength validation
- JWT token expiration
- Protected API routes
- Input sanitization
- Email uniqueness validation

### Data Models

**User Model**: Comprehensive developer profiles with professional information
**Connection Model**: Tracks all interactions between users
**Chat Model**: Stores conversations with message history

## 🌟 Why DevTinder Backend?

- **Developer-focused**: Built specifically for tech professionals
- **Scalable architecture**: Clean separation of concerns
- **Real-time capabilities**: Modern chat experience
- **Professional networking**: Beyond just dating
- **Secure & robust**: Production-ready authentication
- **Email integration**: Professional communication

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For questions or support, please reach out through the repository issues.

---

**Built with ❤️ for the developer community**
