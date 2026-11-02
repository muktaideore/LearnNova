# 📚 Learnova – Real-Time Group Study Platform

Learnova is a full-stack MERN application where students create virtual study rooms, watch videos together in sync, chat in real time, and take notes, all in one place.

🔗 **Live Demo:** https://learnnova-o8gz.onrender.com

---

## ✨ Features

- **Authentication:** Register and login with JWT, email OTP verification, and forgot/reset password
- **Study Rooms:** Create, join, and leave rooms; hosts can remove members or delete the room
- **Synchronized Video:** Play, pause, and seek stay in sync for everyone in a room
  - Supports YouTube, Vimeo, direct MP4, Google Drive, and generic embeds
- **Real-Time Chat:** Room-based chat with history, delete-own-message, and host-only clear chat
- **Online Presence:** See who is currently in the room
- **Room Notes:** Notes saved per study room
- **Invitations:** Invite users by email and accept or reject invitations
- **Payments:** Razorpay integration (test mode) with server-side signature verification
- **Productivity Tools:** Pomodoro timer, study streaks, analytics charts, and study calendar
- **Responsive UI:** Works on mobile, tablet, and desktop, with selectable themes

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, Tailwind CSS, DaisyUI, Axios, Socket.IO Client |
| Backend | Node.js, Express.js, Socket.IO |
| Database | MongoDB, Mongoose (MongoDB Atlas) |
| Auth | JWT, bcrypt, Email OTP |
| Payments | Razorpay (Test Mode) |
| Email | Brevo (transactional email API) |
| Deployment | Render (frontend and backend as separate services) |

---

## 📁 Project Structure

```
LearnNova/
├── client/                 # React frontend (Vite)
│   └── src/
│       ├── components/     # Reusable UI (groupstudy/, charts, etc.)
│       ├── pages/          # Route pages (Landing, Dashboard, StudyRoom...)
│       ├── video/          # Multi-provider video player + adapters
│       ├── services/       # Axios API instance
│       └── socket.js       # Socket.IO client
└── server/                 # Express backend
    ├── controllers/
    ├── models/             # Mongoose schemas
    ├── routes/
    ├── middleware/         # JWT auth middleware
    ├── utils/              # Email helper, streak/study-time helpers
    ├── socket.js           # Socket.IO event handlers
    └── server.js           # App entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB Atlas cluster (or local MongoDB)
- Razorpay test account
- Brevo account with a verified sender

### 1. Clone the repository
```bash
git clone https://github.com/muktaideore/LearnNova.git
cd LearnNova
```

### 2. Backend setup
```bash
cd server
npm install
```

Create `server/.env`:
```env
