# MERN Chat

A real-time chat application built with the MERN stack and Socket.io. Users can sign up, log in, search for other users, and exchange messages in real time.

## Live demo

[mern-chat-astrolab.vercel.app](https://mern-chat-astrolab.vercel.app)

## Tech stack

**Frontend:** React · Vite · Tailwind CSS · Socket.io-client · Zustand  
**Backend:** Node.js · Express 5 · Socket.io · MongoDB · Mongoose · JWT

## Features

- JWT authentication with HttpOnly cookies
- Real-time messaging via WebSockets (Socket.io)
- User search and online/offline presence indicator
- Persistent message history in MongoDB
- Responsive UI

## Getting started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account

### 1. Clone and install

```bash
git clone https://github.com/astrolabscig/mern-chat.git
cd mern-chat
npm install
npm install --prefix frontend
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env with your MONGO_DB_URI and JWT_SECRET
```

### 3. Run

```bash
# Terminal 1 - backend (http://localhost:5000)
npm run dev

# Terminal 2 - frontend (http://localhost:5173)
npm run dev --prefix frontend
```

## Deployment

```bash
npm run build   # builds frontend/dist
npm start       # serves frontend + API from Express
```

Set `NODE_ENV=production` and `CORS_ORIGIN=https://your-domain.com` in your hosting env vars.

## Author

Joseph Afful · [LinkedIn](https://www.linkedin.com/in/joseph-boafo-afful-911171363/) · astrolabscig@gmail.com
