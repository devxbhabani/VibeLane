# VibeLane — Next-Gen Editorial E-Commerce

<div align="center">

  <p align="center">
    <strong>A high-fashion, brutalist lifestyle & e-commerce destination inspired by contemporary editorial fashion aesthetics.</strong>
  </p>

  <p align="center">
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" /></a>
    <a href="https://vite.dev/"><img src="https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" /></a>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" /></a>
    <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" /></a>
    <a href="https://supabase.com/"><img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" /></a>
    <a href="https://redis.io/"><img src="https://img.shields.io/badge/Redis-Cache-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" /></a>
    <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" /></a>
  </p>

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
  - [Frontend Experience & Aesthetics](#frontend-experience--aesthetics)
  - [Backend Services & Data Architecture](#backend-services--data-architecture)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#1-prerequisites)
  - [Installation](#2-installation)
  - [Database Setup](#3-database-setup-supabase-postgresql)
  - [Environment Variables](#4-environment-variables)
  - [Database Seeding](#5-database-seeding)
  - [Running the App Locally](#6-running-the-app-locally)
- [REST API Reference](#-rest-api-reference)
- [Deployment Guide](#-deployment-guide)
- [License](#-license)

---

## ✦ Overview

**VibeLane** bridges high-fashion editorial brutalism with modern web engineering. Built with **React 19**, **Tailwind CSS v4**, **Framer Motion**, and **Lenis Smooth Scroll**, the client delivers an ultra-smooth, kinetic experience featuring masked typography reveals, interactive lookbooks, and dual-perspective apparel previews.

The backend is an enterprise-grade **Node.js/Express** micro-architecture backed by **Supabase PostgreSQL** for persistent relational storage, an in-memory **Redis** cache tier for sub-millisecond query responses, and a complete authentication suite supporting JWT security, bcrypt hashing, and SMTP-driven OTP verification.

---

## ⚡ Key Features

### Frontend Experience & Aesthetics

- **Cinematic Entrance & Fluid Transitions**:
  - **Splash Screen (`SplashScreen.jsx`)**: Minimalist branded boot loader welcoming users on first visit.
  - **Route Transition Loader (`RouteTransitionLoader.jsx`)**: Elegant progress indication during SPA navigation.
  - **Scroll-To-Top Synchronization (`ScrollToTop.jsx`)**: Auto-resets scroll coordinates across route changes.
- **Kinetic Masked Typography (`HeroTitle.jsx`, `BagTitle.jsx`)**:
  - Viewport-scaling responsive wordmarks (`text-[19.8vw]`) set in Swiss Neo-Grotesque (**Inter Tight 900**).
  - Letter-by-letter overflow-masked reveals with staggered easing curves (`cubic-bezier(0.16, 1, 0.3, 1)`).
  - Self-drawing horizontal structural divider lines.
- **Editorial Asymmetric Lookbook (`Lookgrid.jsx`)**:
  - Dynamically calculated multi-column and multi-row spans creating a high-fashion magazine layout.
  - **Dual-Angle Hover Crossfade**: Smooth transition between primary front angle and alternate/detail shots.
  - **Word-Fitted Kinetic Underlines**: CSS pseudo-element underlines expanding seamlessly from left-to-right on product card and link hover (`group-hover:after:w-full`).
  - **Live Category Filter**: Instant multi-category filtering with real-time item count badges.
  - **Scroll-Triggered Reveals**: Framer Motion viewport-based entrance animations (`whileInView`).
- **Smooth Inertial Scrolling (`lenis/react`)**:
  - Native wheel and touch interpolation with custom physics (`lerp: 0.09`, `wheelMultiplier: 1.1`).
- **Complete E-Commerce Flow**:
  - **Product Detail (`ProductDetail.jsx`)**: Dynamic slug routing (`/products/:slug`), high-res dual image inspect, pricing metrics, and inventory indicators.
  - **Shopping Bag (`Bag.jsx`)**: Reactive cart state, quantity controls, subtotal computation, and kinetic empty-state messaging.
  - **Checkout (`Checkout.jsx`)**: Shipping address capture, itemized pricing breakdown, and mock payment pipeline.
  - **User Authentication & Orders (`Login.jsx`, `Signup.jsx`, `VerifyOtp.jsx`, `Account.jsx`, `Orders.jsx`)**: Full authentication lifecycle with 6-digit OTP email verification and authenticated order history.
  - **Editorial Legal Pages (`Privacy.jsx`, `Terms.jsx`)**: Indexed legal documentation structured in minimalist dark layout.

---

### Backend Services & Data Architecture

- **High-Performance Layered Architecture**:
  - Layered structure: `controllers/`, `routes/`, `services/`, `middleware/`, `config/`, and `utils/`.
  - Operational error handling via `AppError` and centralized `errorHandler`.
  - Standardized JSON responses using `ApiResponse`.
- **Database & Persistence (Supabase PostgreSQL)**:
  - Relational schema with index optimizations on `slug`, `category`, and `price`.
  - Row Level Security (RLS) policies configured for public reads and authenticated actions.
  - Graceful fallback: Runs seamlessly with in-memory catalog mock data if remote database is unreachable.
- **Redis In-Memory Caching (`ioredis`)**:
  - Caches product queries (`all_products`, categories, single product slugs) to reduce database load.
  - Automatic reconnection backoff with non-blocking lazy connect (app boots cleanly even if Redis is offline).
- **Authentication & Security Pipeline**:
  - **JWT Tokens (`jsonwebtoken`)**: Stateless authorization for protected user endpoints.
  - **Bcrypt Hashing (`bcryptjs`)**: Cryptographically secure salt-and-hash storage for user credentials.
  - **OTP Email Verification (`nodemailer`)**: Transports time-limited verification codes over secure SMTP.
  - **Rate Limiting (`express-rate-limit`)**: Protects auth and OTP endpoints against abuse and brute-force attacks (`authLimiter`, `otpLimiter`).
  - **CORS Management**: Configured for multiple development and production origins, including automated wildcard resolution for preview deployments (`*.vercel.app`).

---

## 🛠️ Architecture & Tech Stack

```text
┌────────────────────────────────────────────────────────┐
│             VibeLane Client (React 19 + Vite)          │
│  Lenis Scroll │ Framer Motion │ Tailwind CSS v4 │ SPA  │
└───────────────────────────┬────────────────────────────┘
                            │ REST / JSON via Fetch API
┌───────────────────────────▼────────────────────────────┐
│              VibeLane API Server (Node / Express)      │
│  Rate Limiting │ JWT Auth │ Nodemailer │ Error Handler │
└─────────────┬────────────────────────────┬─────────────┘
              │                            │
   Read / Write Query               In-Memory Cache (TTL)
              │                            │
┌─────────────▼───────────────┐  ┌─────────▼─────────────┐
│  Supabase (PostgreSQL 15)   │  │   Redis Server (v7+)  │
│  Products, Users, Orders    │  │   Catalogs & Slugs    │
└─────────────────────────────┘  └───────────────────────┘
```

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Client Core** | [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/) | Component architecture, fast HMR, and modern client bundling |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | CSS-first configuration via `@tailwindcss/vite` |
| **Typography** | Inter & Inter Tight (Google Fonts) | Editorial Swiss Neo-Grotesque look |
| **Motion & Scroll**| [Framer Motion](https://www.framer.com/motion/) + [Lenis](https://lenis.darkroom.engineering/) | Kinetic reveals, layout animations & smooth inertial scrolling |
| **Routing** | [React Router v7](https://reactrouter.com/) | Client-side routing with parameter matchers & layout nesting |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, vector iconography |
| **Server Engine** | [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) | RESTful API server using modern ES Modules |
| **Primary Database**| [Supabase](https://supabase.com/) (PostgreSQL) | Managed relational database storage |
| **Cache Tier** | [Redis](https://redis.io/) via [ioredis](https://github.com/redis/ioredis) | Sub-millisecond product & category caching layer |
| **Auth & Security** | JWT, Bcrypt.js, Express Rate Limit | Tokenized authorization and brute-force protection |
| **Mailing** | [Nodemailer](https://nodemailer.com/) | Transactional OTP dispatch over SMTP |

---

## 📁 Project Directory Structure

```text
VibeLane-Ecom/
├── frontend/                         # Client Application (React 19 + Vite + Tailwind v4)
│   ├── public/                       # Static media, icons & favicon.svg
│   ├── src/
│   │   ├── assets/                   # Static imagery & brand marks
│   │   ├── components/               # Modular UI components
│   │   │   ├── hero/                 # HeroTitle.jsx, BagTitle.jsx (kinetic text)
│   │   │   ├── layout/               # Navbar, Footer, Manifesto, SplashScreen, Loaders
│   │   │   └── lookbook/             # Lookgrid.jsx (staggered asymmetric grid)
│   │   ├── context/                  # Global state management (AppContext.jsx)
│   │   ├── hooks/                    # Custom hooks (useProducts.js, useFetch.js)
│   │   ├── pages/                    # Route views (Home, Bag, Checkout, Auth, Account)
│   │   ├── services/                 # Frontend API consumers (productService.js, api.js)
│   │   ├── styles/                   # Global CSS & Tailwind imports (index.css)
│   │   ├── utils/                    # Constants & formatting helpers
│   │   ├── App.jsx                   # Root application wrapper with Lenis & Router
│   │   └── main.jsx                  # React DOM 19 entrypoint
│   ├── index.html                    # HTML shell with Google Fonts
│   ├── vercel.json                   # Vercel SPA routing rewrites
│   ├── vite.config.js                # Vite build config with Tailwind v4 plugin
│   └── package.json
│
├── backend/                          # API Server (Node.js + Express + Supabase + Redis)
│   ├── src/
│   │   ├── config/                   # db.js (Supabase), redis.js (ioredis client)
│   │   ├── constants/                # System constants
│   │   ├── controllers/              # Request handlers (auth, product, user, health)
│   │   ├── middleware/               # errorHandler, asyncHandler, rateLimiter
│   │   ├── models/                   # Mock fallback data & schemas
│   │   ├── routes/                   # Route definitions (product, auth, user, index)
│   │   ├── scripts/                  # Database seed scripts (seedSupabase.js)
│   │   ├── services/                 # Business logic & cache layers (productService.js)
│   │   ├── utils/                    # ApiResponse.js, AppError.js, mailer.js
│   │   ├── app.js                    # Express app configuration & CORS setup
│   │   └── server.js                 # Server entrypoint and port listener
│   ├── supabase_schema.sql           # PostgreSQL table definitions & RLS policies
│   ├── .env.example                  # Environment variable reference
│   └── package.json
│
├── package.json                      # Root workspace orchestrator (concurrently)
└── README.md                         # Comprehensive documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **Supabase Account**: Free project created on [supabase.com](https://supabase.com)
- **Redis Server** *(Optional)*: Local Redis instance (`redis-server`) or cloud Redis (Upstash, Redis Cloud)

---

### 2. Installation

Clone the repository and install all dependencies across the entire monorepo with one command:

```bash
git clone https://github.com/devxbhabani/VibeLane.git
cd VibeLane

# Installs root, frontend, and backend packages
npm run install:all
```

---

### 3. Database Setup (Supabase PostgreSQL)

1. Navigate to your Supabase Project dashboard and open the **SQL Editor**.
2. Run the SQL schema found in [`backend/supabase_schema.sql`](file:///d:/VibeLane-Ecom/backend/supabase_schema.sql):

```sql
CREATE TABLE IF NOT EXISTS public.products (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  item_number VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  category VARCHAR(100) NOT NULL,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  badge VARCHAR(50) DEFAULT '',
  primary_image TEXT NOT NULL,
  hover_image TEXT NOT NULL,
  description TEXT DEFAULT '',
  in_stock BOOLEAN DEFAULT TRUE,
  stock_quantity INTEGER DEFAULT 20,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on products" ON public.products FOR SELECT TO public USING (true);
CREATE POLICY "Allow write access on products" ON public.products FOR ALL TO public USING (true) WITH CHECK (true);
```

---

### 4. Environment Variables

#### Backend (`backend/.env`):
Create `backend/.env` (reference `backend/.env.example`):

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
API_PREFIX=/api/v1

# Supabase Credentials
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-or-service-role-key

# Redis In-Memory Cache (Defaults to local if not set)
REDIS_URL=redis://127.0.0.1:6379

# Authentication & Security
JWT_SECRET=your_super_secret_jwt_key_here

# Nodemailer / SMTP (for OTP Verification)
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

#### Frontend (`frontend/.env`):
Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

---

### 5. Database Seeding

Populate your Supabase PostgreSQL instance with the curated 16-item editorial lookbook:

```bash
cd backend
npm run seed:supabase
```

---

### 6. Running the App Locally

Start both the backend server and frontend development client concurrently from the root directory:

```bash
npm run dev
```

Or launch services independently:

| Service | Command | URL |
| :--- | :--- | :--- |
| **Frontend** | `npm run dev:frontend` | `http://localhost:5173` |
| **Backend API** | `npm run dev:backend` | `http://localhost:5000` |

---

## 📡 REST API Reference

All backend endpoints are prefixed with `/api/v1` (proxied in Vite dev via `/api`):

### 🏷️ Product Catalog

| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/health` | Service health status and timestamp | None |
| `GET` | `/api/v1/products` | Retrieve catalog with Redis caching | `?category=`, `?search=`, `?sort=`, `?minPrice=`, `?maxPrice=` |
| `GET` | `/api/v1/products/categories` | Retrieve distinct product categories | None |
| `GET` | `/api/v1/products/:id` | Fetch single product by `id` or `slug` | None |

### 🔐 Authentication

| Method | Endpoint | Description | Rate Limit |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/signup` | Register new account and trigger email OTP | Protected (`otpLimiter`) |
| `POST` | `/api/v1/auth/verifyotp` | Verify 6-digit OTP code and issue JWT token | Protected (`authLimiter`) |
| `POST` | `/api/v1/auth/login` | Authenticate with credentials and issue JWT token | Protected (`authLimiter`) |

### 👤 User Management & Orders

| Method | Endpoint | Description | Authorization |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/user/:userId/profile` | Retrieve customer profile details | Bearer Token |
| `PUT` | `/api/v1/user/:userId/profile` | Update profile information | Bearer Token |
| `GET` | `/api/v1/user/:userId/orders` | Retrieve customer order history | Bearer Token |
| `POST` | `/api/v1/user/orders` | Place and finalize a new order | Bearer Token |

---

## 🌐 Deployment Guide

### Deploy Backend (e.g. Render / Railway)

1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your GitHub repository.
3. Set configuration:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add all environment variables from `backend/.env` (`NODE_ENV=production`, `SUPABASE_URL`, `SUPABASE_KEY`, `JWT_SECRET`, `SMTP_EMAIL`, `SMTP_PASSWORD`, `CLIENT_URL=https://your-site.vercel.app`).

### Deploy Frontend (Vercel)

1. Import the repository on [Vercel](https://vercel.com).
2. Set configuration:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
3. Add Environment Variable:
   - `VITE_API_BASE_URL`: `https://your-backend-service.onrender.com/api/v1`
4. Deploy! SPA routing fallbacks are already configured in `frontend/vercel.json`.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <sub>Crafted with passion, aesthetics, and precision by <a href="https://github.com/devxbhabani">devxbhabani</a>.</sub>
</div>
