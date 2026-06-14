# Productr — Full Stack Developer Assignment

> Orufy Technologies Pvt. Ltd. | Full Stack Developer Assignment

A fully functional product management web application built with React.js, Node.js + Express, and MongoDB — developed exactly as per the provided Figma design.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
  - [4. Seed the Database](#4-seed-the-database)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [How to Use the App](#how-to-use-the-app)

---

## Project Overview

Productr is a product listing and management platform. Users can register/login via OTP, then manage their products — add, edit, publish/unpublish, and delete — all reflected in real-time from a MongoDB-backed REST API.

---

## Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | React.js (Vite), React Router v6, Axios, CSS Modules |
| Backend    | Node.js, Express.js, express-validator          |
| Database   | MongoDB Atlas, Mongoose                         |
| Auth       | OTP-based login (no password)                   |

---

## Project Structure

```
Assignment/
├── client/                        # React.js frontend
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── api/
│       │   ├── axios.js           # Axios base config
│       │   ├── products.js        # Product API calls
│       │   └── contact.js
│       ├── context/
│       │   └── AuthContext.jsx    # Auth state (localStorage)
│       ├── components/
│       │   ├── AuthLayout.jsx     # Login/OTP split-screen layout
│       │   ├── AppLayout.jsx      # Sidebar + main area layout
│       │   ├── Sidebar.jsx        # Left dark navigation
│       │   ├── TopBar.jsx         # Gradient top bar with avatar
│       │   ├── ProductCard.jsx    # Product card with CRUD actions
│       │   ├── AddProductModal.jsx
│       │   ├── EditProductModal.jsx
│       │   ├── DeleteModal.jsx
│       │   ├── EmptyState.jsx
│       │   └── Toast.jsx
│       └── pages/
│           ├── Login.jsx          # Email/phone login
│           ├── OTP.jsx            # 6-digit OTP verification
│           ├── Register.jsx       # New account signup
│           ├── Dashboard.jsx      # Home — Published/Unpublished tabs
│           └── Products.jsx       # Products list + add
│
└── server/                        # Node.js + Express backend
    ├── .env                       # Environment variables (not committed)
    ├── .env.example               # Template
    └── src/
        ├── index.js               # Express app entry point
        ├── seed.js                # Sample data seeder
        ├── config/
        │   └── db.js              # MongoDB connection
        ├── models/
        │   ├── User.js
        │   ├── Product.js
        │   └── Contact.js
        └── routes/
            ├── authRoutes.js      # /api/auth
            ├── productRoutes.js   # /api/products
            └── contactRoutes.js   # /api/contact
```

---

## Features

- OTP-based login (no passwords) — enter email/phone, get OTP in server console
- Register new account
- Add products with: name, type, stock, MRP, selling price, brand, images, return eligibility
- Edit any product via pre-filled modal
- Delete product with confirmation dialog
- Publish / Unpublish products
- Home dashboard shows Published and Unpublished tabs separately
- Products page with full CRUD
- Success toast notifications
- Loading states and error handling
- Fully responsive — works on desktop and mobile
- Input validation on all forms (frontend + backend)

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- A MongoDB Atlas account (free) **or** local MongoDB installed

---

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Assignment
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create your `.env` file:

```bash
copy .env.example .env
```

Edit `server/.env` and set your MongoDB URI (see [Environment Variables](#environment-variables) below).

Start the backend:

```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected
```

---

### 3. Frontend Setup

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

The Vite dev server automatically proxies `/api` requests to `http://localhost:5000`.

---

### 4. Seed the Database

In the `server` directory, run:

```bash
node src/seed.js
```

Expected output:
```
✓ Seeded 12 products
```

---

## Environment Variables

All environment variables go in `server/.env`.

| Variable    | Required | Description                    | Example                                                                 |
|-------------|----------|--------------------------------|-------------------------------------------------------------------------|
| `PORT`      | No       | Port for Express server        | `5000`                                                                  |
| `MONGO_URI` | Yes      | MongoDB connection string      | `mongodb+srv://user:pass@cluster.mongodb.net/orufy_db`                 |

### How to get a free MongoDB Atlas URI

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and sign up free
2. Create a free M0 cluster
3. Under Security → Database Access: create a user with a password
4. Under Security → Network Access: click "Allow Access from Anywhere"
5. Click "Connect" on your cluster → Drivers → copy the URI
6. Replace `<password>` with your actual password and paste into `server/.env`

---

## API Reference

Base URL: `http://localhost:5000/api`

### Auth

| Method | Endpoint              | Description                        |
|--------|-----------------------|------------------------------------|
| POST   | `/auth/register`      | Register new user                  |
| POST   | `/auth/send-otp`      | Send OTP to email/phone            |
| POST   | `/auth/verify-otp`    | Verify OTP and get user session    |

### Products

| Method | Endpoint              | Description                        |
|--------|-----------------------|------------------------------------|
| GET    | `/products`           | Get all products                   |
| GET    | `/products/:id`       | Get single product                 |
| POST   | `/products`           | Create new product                 |
| PUT    | `/products/:id`       | Update product                     |
| DELETE | `/products/:id`       | Delete product                     |

### Contact

| Method | Endpoint   | Description              |
|--------|------------|--------------------------|
| POST   | `/contact` | Submit contact message   |
| GET    | `/contact` | Get all messages         |

---

## How to Use the App

1. Open **http://localhost:5173**
2. Enter your email or phone number → click **Login**
3. Check the **server terminal** for the OTP (e.g. `OTP for test@gmail.com: 482951`)
4. Enter the 6-digit OTP → click **Enter your OTP**
5. You're now logged in to the dashboard
6. Go to **Products** → click **Add your Products** to create your first product
7. Use **Publish** / **Edit** / **Delete** buttons on each product card
8. Published products appear in the **Home → Published** tab

> Note: OTP is printed to the server console for demo purposes. In production, it would be sent via SMS or email.
