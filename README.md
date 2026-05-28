# 🤝 Business Nexus – Real-Time Collaboration Platform

Business Nexus is a modern full-stack collaboration platform that connects **Investors** and **Entrepreneurs** through a secure request workflow, real-time messaging, and live notifications.

The platform enables entrepreneurs to showcase their ideas and investors to discover potential startups, send collaboration proposals, and communicate instantly after approval.

Built with scalable architecture using **React**, **Redux Toolkit**, **Node.js**, **MongoDB**, and **Socket.IO**.

---

# ✨ Core Features

## 🔐 Authentication & Authorization

- JWT Authentication
- Access Token + Refresh Token flow
- Secure HTTP-only cookies
- Protected routes
- Role-based access control
- Auto-login on refresh
- Persistent authentication state

---

# 👨‍💼 Investor Features

- Browse all entrepreneurs
- View entrepreneur public profiles
- Send collaboration proposals
- Track sent requests
- Get real-time request status updates
- Chat with accepted entrepreneurs
- Receive live notifications

---

# 🚀 Entrepreneur Features

- Complete professional profile
- Receive collaboration proposals
- Accept or reject requests
- View interested investors
- Real-time notifications
- Chat with accepted investors

---

# 💬 Real-Time Features

Implemented using **Socket.IO**.

## ⚡ Real-Time Chat

- Instant messaging
- Live message delivery
- Dynamic socket rooms
- MongoDB message persistence
- Auto room joining
- Real-time message sync

## 🔔 Real-Time Notifications

- Instant collaboration request alerts
- Live request acceptance/rejection updates
- Notification unread/read state
- Real-time notification dropdown
- Socket-based event system

---

# 🧠 Frontend Architecture

Built with:

- React
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Axios
- React Router DOM
- Socket.IO Client

## 📦 Frontend Features

- Global auth state management
- Protected dashboard layouts
- Reusable API layer
- Responsive UI/UX
- Real-time socket integration
- Persistent login sessions
- Dynamic notification system

---

# 🛠️ Backend Architecture

Built with:

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT
- Multer
- Cloudinary

## 📦 Backend Features

- RESTful APIs
- JWT authentication middleware
- Role-based authorization
- MongoDB schema relationships
- Real-time socket server
- Online users tracking
- Scalable request handling

---

# 📁 Main Modules

## 👤 User System

Supports two user roles:

- Investor
- Entrepreneur

Users can:

- Create profiles
- Upload avatars
- Add bio and skills
- Showcase startup ideas
- Manage collaborations

---

# 🤝 Collaboration Request System

Investors can send collaboration requests with proposal messages.

Entrepreneurs can:

- Accept requests
- Reject requests
- Manage incoming proposals

Accepted requests unlock:

- Real-time chat access
- Collaboration dashboard visibility

---

# 🔔 Notification System

Notifications are generated for:

- New collaboration requests
- Accepted requests
- Rejected requests
- Real-time collaboration updates

Features include:

- Live socket notifications
- Read/unread tracking
- Notification dropdown UI
- Real-time frontend sync

---

# 💬 Chat System

Only accepted collaborators can chat.

## Features

- Real-time messaging
- MongoDB message storage
- Live delivery
- Socket room architecture
- Connected user tracking
- Persistent conversations

---

# 🧾 Database Models

## User Model

Includes:

- Name
- Email
- Password
- Role
- Avatar
- Bio
- Skills
- Experience
- Startup idea
- Portfolio companies
- Profile completion status

---

## Request Model

```ts
senderId: ObjectId;
receiverId: ObjectId;
message: string;
status: "pending" | "accepted" | "rejected";
```

---

## Notification Model

```ts
userId: ObjectId;
title: string;
message: string;
type: string;
isRead: boolean;
relatedUserId?: ObjectId;
relatedRequestId?: ObjectId;
```

---

## Message Model

```ts
senderId: ObjectId;
receiverId: ObjectId;
message: string;
```

---

# 🌐 API Overview

## Authentication

```bash
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
GET    /api/v1/auth/me
POST   /api/v1/auth/refresh-access
```

---

## Profiles

```bash
GET    /api/v1/profile/entrepreneurs
GET    /api/v1/profile/entrepreneurs/:id
POST   /api/v1/profile/investor
POST   /api/v1/profile/entrepreneur
```

---

## Collaboration Requests

```bash
POST   /api/v1/request/send/:id
GET    /api/v1/request/sent
GET    /api/v1/request/received
PATCH  /api/v1/request/update/:id
GET    /api/v1/request/accepted
```

---

## Notifications

```bash
GET    /api/v1/notifications
PATCH  /api/v1/notifications/:id/read
```

---

## Messages

```bash
POST   /api/v1/messages/send
GET    /api/v1/messages/:receiverId
```

---

# ⚡ Socket Events

## Client Events

```ts
register_user;
join - room;
send - message;
send_notification;
send_request_status_notification;
```

---

## Server Events

```ts
receive - message;
receive_notification;
```

---

# 🎨 UI/UX Highlights

- Fully responsive design
- Modern dashboard layouts
- Smooth notification dropdown
- Professional profile pages
- Realtime collaboration experience
- Clean Tailwind UI architecture

---

# 🚀 Running Locally

## Backend

```bash
cd backend
npm install
npm run dev
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🔐 Environment Variables

## Backend `.env`

```env
PORT=8080

MONGO_URI=your_mongodb_uri

JWT_ACCESS_SECRET=your_access_secret

JWT_REFRESH_SECRET=your_refresh_secret

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

# 📷 Screenshots

Add screenshots for:

- Landing Page
- Investor Dashboard
- Entrepreneur Dashboard
- Real-Time Chat
- Notifications System
- Collaboration Workflow
- Profile Pages

---

# 🧑‍💻 Developer

### Muhammad Hashim

GitHub:
https://github.com/hashimgujjar447

---

# 📌 Current Status

## ✅ Completed

- JWT Authentication
- Refresh Token Flow
- Role-Based Dashboards
- Collaboration Requests
- Real-Time Chat
- Real-Time Notifications
- Notification Read State
- Socket.IO Integration
- Profile System
- MongoDB Persistence
- Protected Routes

---

# 🔮 Future Improvements

- Redis socket scaling
- Online/offline indicators
- Typing indicators
- File sharing in chat
- Admin dashboard
- Startup posting feed
- Search & filters
- Group collaboration rooms

---

# 📄 License

MIT License © 2025 Business Nexus
