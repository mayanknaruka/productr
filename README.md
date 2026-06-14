# Productr — Full Stack Developer Assignment

> Orufy Technologies Pvt. Ltd. | Full Stack Developer Assignment

A fully functional product management web application built with React.js, Node.js + Express, and MongoDB — developed exactly as per the provided Figma design.

---

## Live Demo

- Frontend: [https://productr.vercel.app](https://productr.vercel.app) *(update after deploy)*
- Backend API: [https://productr-api.onrender.com](https://productr-api.onrender.com) *(update after deploy)*

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Deployment Guide](#deployment-guide)

---

## Tech Stack

| Layer      | Technology                                           |
|------------|------------------------------------------------------|
| Frontend   | React.js (Vite), React Router v6, Axios, CSS Modules |
| Backend    | Node.js, Express.js, express-validator               |
| Database   | MongoDB Atlas, Mongoose                              |
| Auth       | OTP-based login via Email (Nodemailer + Gmail)       |
| Hosting    | Vercel (frontend) + Render (backend)                 |

---

## Project Structure

```
productr/
├── client/                        # React.js frontend (Vite)
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       ├── api/
│       │   ├── axios.js
│       │   ├── products.js
│       │   └── contact.js
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── components/
│       │   ├── AuthLayout.jsx
│       │   ├── AppLayout.jsx
│       │   ├── Sidebar.jsx
│       │   ├── TopBar.jsx
│       │   ├── ProductCard.jsx
│       │   ├── AddProductModal.jsx
│       │   ├── EditProductModal.jsx
│       │   ├── DeleteModal.jsx
│       │   ├── EmptyState.jsx
│       │   └── Toast.jsx
│       └── pages/
│           ├── Login.jsx
│           ├── OTP.jsx
│           ├── Register.jsx
│           ├── Dashboard.jsx
│           └── Products.jsx
│
└── server/                        # Node.js + Express backend
    ├── .env.example
    └── src/
        ├── index.js
        ├── seed.js
        ├── config/db.js
        ├── models/
        │   ├── User.js
        │   ├── Product.js
        │   └── Contact.js
        ├── routes/
        │   ├── authRoutes.js
        │   ├── productRoutes.js
        │   └── contactRoutes.js
        └── utils/
            └── mailer.js
```

---

## Features

- OTP-based login — enter email, get OTP in your inbox (or on screen in demo mode)
- Register new account
- Add products: name, type, stock, MRP, selling price, brand, images, return eligibility
- Edit product via pre-filled modal
- Delete product with confirmation dialog
- Publish / Unpublish products
- Home dashboard with Published and Unpublished tabs
- Toast notifications on all actions
- Loading states and error handling throughout
- Input validation — frontend + backend
- Fully responsive — desktop and mobile

---

## Getting Started

### Prerequisites

- Node.js >= 18
- A free MongoDB Atlas account

---

### 1. Clone the repo

```bash
git clone https://github.com/mayanknaruka/productr.git
cd productr
```

---

### 2. Backend setup

```bash
cd server
npm install
```

Create your `.env` file:

```bash
copy .env.example .env
```

Fill in the values (see [Environment Variables](#environment-variables) below).

Start the server:

```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected
```

---

### 3. Frontend setup

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

### 4. Seed sample data

```bash
cd server
node src/seed.js
```

Output: `✓ Seeded 12 products`

---

## Environment Variables

Create `server/.env` based on `server/.env.example`:

```env
PORT=5000
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/orufy_db
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

| Variable     | Required | Description                                      |
|--------------|----------|--------------------------------------------------|
| `PORT`       | No       | Express server port (default 5000)               |
| `MONGO_URI`  | Yes      | MongoDB Atlas connection string                  |
| `EMAIL_USER` | No       | Gmail address to send OTP from                   |
| `EMAIL_PASS` | No       | Gmail App Password (16 chars, no spaces)         |

> If `EMAIL_USER` / `EMAIL_PASS` are not set, OTP shows on screen (demo mode).

### How to get Gmail App Password

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to **App Passwords** → create one named "Productr"
4. Copy the 16-character password → paste into `EMAIL_PASS` (no spaces)

---

## API Reference

Base URL: `http://localhost:5000/api`

### Auth

| Method | Endpoint            | Description                     |
|--------|---------------------|---------------------------------|
| POST   | `/auth/register`    | Register new user               |
| POST   | `/auth/send-otp`    | Send OTP to email/phone         |
| POST   | `/auth/verify-otp`  | Verify OTP and login            |

### Products

| Method | Endpoint           | Description          |
|--------|--------------------|----------------------|
| GET    | `/products`        | Get all products     |
| GET    | `/products/:id`    | Get single product   |
| POST   | `/products`        | Create product       |
| PUT    | `/products/:id`    | Update product       |
| DELETE | `/products/:id`    | Delete product       |

### Contact

| Method | Endpoint    | Description            |
|--------|-------------|------------------------|
| POST   | `/contact`  | Submit contact form    |
| GET    | `/contact`  | Get all messages       |

---

## Deployment Guide

### Backend → Render.com (free)

1. Go to [render.com](https://render.com) → New → Web Service
2. Connect GitHub → select `productr` repo
3. Settings:
   - Root directory: `server`
   - Build command: `npm install`
   - Start command: `npm start`
4. Add environment variables:
   - `MONGO_URI` = your Atlas URI
   - `EMAIL_USER` = your Gmail
   - `EMAIL_PASS` = your App Password
   - `CLIENT_URL` = your Vercel URL (e.g. `https://productr.vercel.app`)
5. Deploy → copy your Render URL

### Frontend → Vercel.com (free)

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import `productr` repo from GitHub
3. Settings:
   - Root directory: `client`
   - Framework preset: Vite
4. Add environment variable:
   - `VITE_API_URL` = your Render URL + `/api` (e.g. `https://productr-api.onrender.com/api`)
5. Deploy → your live URL is ready

---

## How to Use

1. Open the app URL
2. Enter your email → click **Login**
3. OTP arrives in your inbox (or shown on screen in demo mode)
4. Enter the 6-digit OTP → logged in
5. Go to **Products** → click **Add your Products**
6. Fill the form → **Create**
7. Use **Publish** / **Edit** / **Delete** on each product card
8. **Home** tab shows Published / Unpublished products separately
