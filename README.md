# 🤝 Business Nexus – Collaboration System

The **Collaboration System** is a key feature of the Business Nexus platform, connecting **Investors** and **Entrepreneurs** through a structured request-accept workflow and real-time chat.

This module spans both the **frontend** and **backend**, using modern tools like **React**, **Redux Toolkit**, **Socket.IO**, and **MongoDB**.

---

## 🌐 Frontend – React + Redux Toolkit

### 🔑 Key Features

- 🔍 **View All Entrepreneurs** (for investors)
- 📤 **Send Collaboration Requests**
- 📥 **Receive, Accept, or Reject Requests** (entrepreneurs)
- ✅ **Accepted Requests** show a `Chat` button
- 💬 **Real-Time Chat** with Socket.IO (after acceptance)

### 🧠 State Management

- Handled via **Redux Toolkit slices** (requests, auth, chat, etc.)
- **Persisted state** using `localStorage` or `redux-persist`

### 📁 Pages / Routes

| Route                     | Role         | Description                    |
| ------------------------- | ------------ | ------------------------------ |
| `/dashboard/investor`     | Investor     | Send requests to entrepreneurs |
| `/dashboard/entrepreneur` | Entrepreneur | View/handle received requests  |
| `/chat`                   | Both         | Chat with collaborators        |
| `/profile/:role/:id`      | Both         | View public profiles           |

---

## 🛠️ Backend – Node.js + Express + MongoDB

### 📦 API Features

- 📨 **POST `/api/request/send`**

  - Investor sends a request to an entrepreneur

- 📩 **GET `/api/request/received`**

  - Fetch received requests (for entrepreneur)

- 📤 **GET `/api/request/sent`**

  - Fetch sent requests (for investor)

- ✅ **PATCH `/api/request/accept/:id`**

  - Accept a collaboration request

- ❌ **PATCH `/api/request/reject/:id`**

  - Reject a request

- 🔁 **GET `/api/request/accepted`**
  - Get list of accepted collaborators

### 🧾 MongoDB Models

#### `Request`

```ts
sender: ObjectId(Investor);
receiver: ObjectId(Entrepreneur);
status: "pending" | "accepted" | "rejected";
```

#### `User` and `UserProfile`

Includes roles (`investor`, `entrepreneur`), avatar, bio, skills, etc.

---

## 💬 Chat Functionality – Socket.IO

- Realtime messaging between accepted collaborators
- Socket connection established on login
- Rooms created based on user pairs
- Messages stored in MongoDB for persistence

---

## ⚙️ Technologies Used

| Area      | Tech Stack                                |
| --------- | ----------------------------------------- |
| Frontend  | React, Redux Toolkit, Tailwind CSS, Axios |
| Backend   | Node.js, Express.js, MongoDB, Mongoose    |
| Realtime  | Socket.IO                                 |
| Auth      | JWT, Bcrypt                               |
| Uploads   | Multer + Cloudinary                       |
| Dev Tools | ESLint, Prettier, Postman, VS Code        |

---

## 🚀 Running Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

Ensure `.env` is configured properly with your MongoDB URI and JWT secret.

---

## 🧑‍💻 Contributors

- 👨‍💻 Muhammad Hashim – [@hashimgujjar447](https://github.com/hashimgujjar447)

---

## 📌 Status

✅ Completed:

- Collaboration request system
- Real-time chat
- Role-based dashboard

🛠️ In Progress:

- Notifications system
- Admin panel for monitoring users and requests

---

## 📷 Screenshots

> Add screenshots of:
>
> - Investor Dashboard
> - Entrepreneur Dashboard
> - Chat UI
> - Request status flow

---

## 📄 License

MIT © 2025 Business Nexus
