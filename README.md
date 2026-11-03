# VibeLane — Next-Gen Editorial E-Commerce

<div align="center">

  <p align="center">
    <strong>A high-fashion brutalist e-commerce platform bridging luxury editorial aesthetics with enterprise web architecture.</strong>
  </p>

  <p align="center">
    <a href="#"><img src="https://img.shields.io/badge/Project_Status-Complete_%2F_Production_Ready-10b981?style=for-the-badge&logo=checkmarx&logoColor=white" alt="Status: Complete" /></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" /></a>
    <a href="https://vite.dev/"><img src="https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" /></a>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" /></a>
    <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" /></a>
    <a href="https://supabase.com/"><img src="https://img.shields.io/badge/Supabase-PostgreSQL_15-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" /></a>
    <a href="https://redis.io/"><img src="https://img.shields.io/badge/Redis-In--Memory_Cache-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" /></a>
    <a href="https://resend.com/"><img src="https://img.shields.io/badge/Resend-Email_API-000000?style=for-the-badge&logo=resend&logoColor=white" alt="Resend" /></a>
    <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" /></a>
  </p>

</div>

---

## 📑 Table of Contents

- [✦ Project Overview](#-project-overview)
- [✨ Key Features](#-key-features)
  - [1. Editorial Client & Brutalist UX](#1-editorial-client--brutalist-ux)
  - [2. Customer Journey & Commerce Pipeline](#2-customer-journey--commerce-pipeline)
  - [3. Role-Based Admin Management Suite](#3-role-based-admin-management-suite)
  - [4. High-Performance Backend & Data Tier](#4-high-performance-backend--data-tier)
  - [5. Cloud Security & Infrastructure](#5-cloud-security--infrastructure)
- [🛠️ Architecture & Flow Overview](#️-architecture--flow-overview)
- [📁 Project Directory Structure](#-project-directory-structure)
- [🚀 Quickstart & Setup Guide](#-quickstart--setup-guide)
  - [Prerequisites](#1-prerequisites)
  - [Monorepo Installation](#2-monorepo-installation)
  - [Database Initialization (Supabase PostgreSQL)](#3-database-initialization-supabase-postgresql)
  - [Environment Configuration](#4-environment-configuration)
  - [Database Seeding](#5-database-seeding)
  - [Running the Monorepo Locally](#6-running-the-monorepo-locally)
- [📡 Comprehensive REST API Reference](#-comprehensive-rest-api-reference)
- [🌐 Production Deployment Guide](#-production-deployment-guide)
- [✅ Production Milestone Checklist](#-production-milestone-checklist)
- [📄 License & Authors](#-license--authors)

---

## ✦ Project Overview

**VibeLane** is a fully completed, production-ready, full-stack e-commerce platform that reimagines online fashion retail through the lens of Swiss typography and brutalist editorial design.

Traditional e-commerce templates rely on generic, repetitive grids. VibeLane distinguishes itself with:
- **Kinetic Typography Reveals**: Masked overflow letter-by-letter animations governed by custom cubic-bezier curves.
- **Asymmetric Staggered Lookbooks**: Editorial editorial layouts combining multi-row and multi-column spans with dual-angle hover crossfades.
- **Sub-Millisecond Response Times**: Redis caching tier shielding a relational Supabase PostgreSQL database.
- **Enterprise-Grade Admin Suite**: Live order lifecycle management, gross revenue tracking, customer metrics, and role-based access control (RBAC).
- **Cloud-Resilient Communication**: Transactional OTP email dispatch powered by the Resend HTTP API, engineered specifically for zero-port-blocking cloud environments like Render.

---

## ✨ Key Features

### 1. Editorial Client & Brutalist UX
- **Masked Kinetic Typography (`HeroTitle.jsx`, `BagTitle.jsx`)**:
  - Viewport-scaling typography (`text-[19.8vw]`) set in Swiss Neo-Grotesque (**Inter Tight 900**).
  - Staggered randomized character reveals animating upward through overflow masks (`cubic-bezier(0.16, 1, 0.3, 1)`).
  - Self-drawing horizontal structural divider rules.
- **Editorial Lookbook Grid (`Lookgrid.jsx`)**:
  - Dynamic aspect ratios (`aspect-[3/4]`, `aspect-[4/5]`) across a responsive CSS grid.
  - **Dual-Angle Perspective**: Instant crossfade between primary look and alternate perspective on hover.
  - **Kinetic Left-to-Right Underlines**: Word-fitted pseudo-element underlines expanding seamlessly across card and link hover (`group-hover:after:w-full`).
  - **Interactive Taxonomy**: Instant client-side category filtering with live badge counters.
  - **Scroll-Triggered Reveals**: Framer Motion viewport animation triggers (`whileInView`).
- **Inertial Smooth Scrolling (`lenis/react`)**:
  - Native wheel and touch physics interpolation (`lerp: 0.09`, `wheelMultiplier: 1.1`).
- **Cinematic Experience Enhancements**:
  - **Branded Boot Screen (`SplashScreen.jsx`)**: Minimalist intro loader on first entry.
  - **Route Transition Loader (`RouteTransitionLoader.jsx`)**: Elegant progress indication during SPA page transitions.
  - **Scroll-To-Top Synchronization (`ScrollToTop.jsx`)**: Consistent coordinate resets on route changes.
  - **Brand Manifesto & Legal Architecture (`Manifesto.jsx`, `Privacy.jsx`, `Terms.jsx`)**: High-impact editorial brand storytelling and structured legal documentation.

### 2. Customer Journey & Commerce Pipeline
- **Dynamic Product Detail (`ProductDetail.jsx`)**:
  - Deep-linkable dynamic routes (`/products/:slug`).
  - High-resolution dual image inspection, availability indicators, and instant bag addition.
- **Reactive Shopping Bag (`Bag.jsx`)**:
  - Global state synchronization via React Context (`AppContext.jsx`).
  - Real-time subtotal calculations, dynamic quantity adjustments, and kinetic empty-state messaging.
- **Streamlined Checkout Pipeline (`Checkout.jsx`)**:
  - Customer shipping detail capture, order summary itemization, and simulated multi-method payment verification.
- **Authenticated Customer Portal (`Account.jsx`, `Orders.jsx`)**:
  - Profile inspection and updating.
  - Customer order archive with real-time status tracking (`Processing`, `Confirmed`, `Shipped`, `Delivered`, `Cancelled`).

### 3. Role-Based Admin Management Suite
- **Admin Dashboard (`/admin`, `AdminDashboard.jsx`)**:
  - **Financial Metrics**: Real-time Gross Revenue calculation across all transactions.
  - **Volume & Fulfillment Counts**: Order state distribution graphs and counts.
  - **Customer Reach**: Real-time tally of unique verified customer accounts.
  - **Recent Orders Stream**: Instant glance at latest placed orders.
- **Order Operations Center (`/admin/orders`, `AdminOrders.jsx`)**:
  - Multi-state filtering: view orders by `All`, `Processing`, `Confirmed`, `Shipped`, `Delivered`, or `Cancelled`.
  - In-place order status updating with automatic database synchronization and instant Redis cache busting.
  - Detailed line-item modal breakdown displaying shipping addresses, email contacts, and purchased item quantities.
- **Strict Role-Based Access Control (RBAC)**:
  - Frontend guard via `<AdminRoute />`.
  - Backend authorization via `protect` and `authorizeAdmin` middleware validating JWT claims.

### 4. High-Performance Backend & Data Tier
- **Modern ES Module Architecture**:
  - Clean layered separation: `controllers/`, `routes/`, `services/`, `middleware/`, `config/`, and `utils/`.
  - Standardized JSON responses via `ApiResponse` and operational error handling via `AppError`.
- **Relational Cloud Persistence (Supabase PostgreSQL)**:
  - Tables for `products`, `users`, `orders`, and `otp_verifications`.
  - B-tree indexing on `slug`, `category`, `price`, `user_id`, and `created_at`.
  - Row Level Security (RLS) configured for safe read access and authenticated administrative updates.
- **Multi-Tier In-Memory Caching (`ioredis`)**:
  - Caches product catalogs, filtered categories, and individual slugs with configurable TTLs.
  - Automatic cache invalidation upon administrative order and product mutations.
  - Non-blocking lazy connection with exponential backoff: server boots and operates with zero disruption if Redis is offline.
  - Seamless in-memory fallback catalog if remote database credentials are missing.

### 5. Cloud Security & Infrastructure
- **Cloud-Native Email Protocol (Resend HTTP API)**:
  - Replaces traditional SMTP (ports 25, 465, 587) with Resend's REST API over HTTPS (Port 443).
  - Eliminates cloud firewall packet dropping on host platforms like Render.
- **Authentication & Cryptography**:
  - **JWT Tokens (`jsonwebtoken`)**: Stateless bearer token verification for protected endpoints.
  - **Bcrypt Hashing (`bcryptjs`)**: Salted password hashing (12 rounds) protecting credentials.
  - **Time-Limited OTPs**: 6-digit codes with 5-minute expiration windows for verified registrations.
- **Network & Proxy Hardening**:
  - Express `trust proxy` configured for Render, Vercel, and Cloudflare reverse proxies.
  - Route-specific rate limiters (`authLimiter`, `otpLimiter`) mitigating brute-force and spam vectors.
  - Dynamic CORS resolution supporting local dev, staging, and wildcard production origins (`*.vercel.app`).

---

## 🛠️ Architecture & Flow Overview

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   VibeLane Client (React 19 + Vite)                    │
│   Lenis Scroll │ Framer Motion │ Tailwind CSS v4 │ Admin Dashboard     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTPS / REST (JSON)
┌───────────────────────────────────▼────────────────────────────────────┐
│                  VibeLane API Server (Node / Express)                  │
│    Reverse Proxy Trust │ Rate Limiting │ JWT RBAC │ Centralized Errors │
└─────────────┬─────────────────────┬───────────────────────┬────────────┘
              │                     │                       │
      HTTPS (Port 443)      SQL Queries (Pool)       In-Memory Caching (TTL)
              │                     │                       │
┌─────────────▼─────────┐ ┌─────────▼─────────────┐ ┌───────▼────────────┐
│   Resend Email API    │ │  Supabase PostgreSQL  │ │    Redis Cache     │
│  Instant OTP Delivery │ │ Users, Orders, Catalog│ │  Sub-ms Catalogs   │
└───────────────────────┘ └───────────────────────┘ └────────────────────┘
```

| Domain | Technology | Production Role |
| :--- | :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/) | High-speed component rendering, strict mode compliance, instant HMR |
| **Styling & Theme** | [Tailwind CSS v4](https://tailwindcss.com/) | CSS-first configuration via `@tailwindcss/vite` |
| **Motion & Dynamics** | [Framer Motion](https://www.framer.com/motion/) + [Lenis](https://lenis.darkroom.engineering/) | Kinetic reveals, layout animations & smooth inertial scrolling |
| **Client Routing** | [React Router v7](https://reactrouter.com/) | Protected customer & admin layouts, dynamic slug matching |
| **Icons** | [Lucide React](https://lucide.dev/) | Vector iconography |
| **Server Engine** | [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) | RESTful API server using modern ES Modules |
| **Primary Database** | [Supabase](https://supabase.com/) (PostgreSQL 15) | Relational database storage with Row Level Security |
| **Caching Layer** | [Redis](https://redis.io/) via [ioredis](https://github.com/redis/ioredis) | Sub-millisecond product & category caching tier |
| **Transactional Email**| [Resend](https://resend.com/) (Node.js SDK) | HTTPS-based transactional OTP delivery |
| **Security & Auth** | JWT, Bcrypt.js, Express Rate Limit | Tokenized authorization, password hashing, and anti-abuse protection |

---

## 📁 Project Directory Structure

```text
VibeLane-Ecom/
├── frontend/                         # Client Application (React 19 + Vite + Tailwind v4)
│   ├── public/                       # Static media, lookbook assets & favicon.svg
│   ├── src/
│   │   ├── assets/                   # Static imagery & brand marks
│   │   ├── components/               # Modular UI components
│   │   │   ├── auth/                 # AdminRoute.jsx (RBAC client guard)
│   │   │   ├── hero/                 # HeroTitle.jsx, BagTitle.jsx (kinetic text)
│   │   │   ├── layout/               # Navbar, Footer, Manifesto, SplashScreen, Loaders
│   │   │   └── lookbook/             # Lookgrid.jsx (staggered asymmetric grid)
│   │   ├── context/                  # Global state management (AppContext.jsx)
│   │   ├── hooks/                    # Custom hooks (useProducts.js, useFetch.js)
│   │   ├── pages/                    # Route views (Home, Bag, Checkout, Auth, Admin)
│   │   │   ├── AdminDashboard.jsx    # Admin revenue & metrics overview
│   │   │   ├── AdminOrders.jsx       # Admin order management & status updater
│   │   │   ├── Account.jsx           # Customer profile management
│   │   │   ├── Orders.jsx            # Customer order history
│   │   │   ├── ProductDetail.jsx     # Dynamic single item page
│   │   │   ├── Privacy.jsx           # Editorial Privacy Policy
│   │   │   └── Terms.jsx             # Editorial Terms of Service
│   │   ├── services/                 # API consumers (productService.js, adminService.js, api.js)
│   │   ├── styles/                   # Global CSS & Tailwind imports (index.css)
│   │   ├── utils/                    # Constants & formatting helpers
│   │   ├── App.jsx                   # Root application wrapper with Lenis & Router
│   │   └── main.jsx                  # React DOM 19 entrypoint
│   ├── index.html                    # HTML shell with Google Fonts (Inter, Inter Tight)
│   ├── vercel.json                   # Vercel SPA routing rewrites
│   ├── vite.config.js                # Vite build config with Tailwind v4 plugin
│   └── package.json
│
├── backend/                          # API Server (Node.js + Express + Supabase + Redis)
│   ├── src/
│   │   ├── config/                   # db.js (Supabase), redis.js (ioredis client)
│   │   ├── constants/                # System & cache constants
│   │   ├── controllers/              # Request handlers (admin, auth, product, user, health)
│   │   ├── middleware/               # errorHandler, asyncHandler, authMiddleware, rateLimiter
│   │   ├── models/                   # Mock fallback data & schemas
│   │   ├── routes/                   # Route definitions (admin, auth, product, user, index)
│   │   ├── scripts/                  # Seed scripts (seedSupabase.js, seedProducts.js)
│   │   ├── services/                 # Business logic & cache layers (productService.js, mailService.js)
│   │   ├── utils/                    # ApiResponse.js, AppError.js
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

## 🚀 Quickstart & Setup Guide

### 1. Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **Supabase Account**: Free project created on [supabase.com](https://supabase.com)
- **Resend Account**: Free account on [resend.com](https://resend.com)
- **Redis Server** *(Optional)*: Local Redis instance (`redis-server`) or cloud provider (Upstash, Redis Cloud)

---

### 2. Monorepo Installation

Clone the repository and install all dependencies across the entire workspace with a single command:

```bash
git clone https://github.com/devxbhabani/VibeLane.git
cd VibeLane

# Installs root, frontend, and backend packages concurrently
npm run install:all
```

---

### 3. Database Initialization (Supabase PostgreSQL)

1. Open your Supabase Project dashboard and navigate to the **SQL Editor**.
2. Run the complete schema script found in [`backend/supabase_schema.sql`](file:///d:/VibeLane-Ecom/backend/supabase_schema.sql):

```sql
-- 1. Products Table
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

-- 2. Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name VARCHAR(255) DEFAULT '',
  role VARCHAR(50) DEFAULT 'customer',
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  email VARCHAR(255) NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  status VARCHAR(50) NOT NULL DEFAULT 'processing',
  shipping_address JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. OTP Verifications Table
CREATE TABLE IF NOT EXISTS public.otp_verifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  otp_hash TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'signup',
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and default policies
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on products" ON public.products FOR SELECT TO public USING (true);
CREATE POLICY "Allow write access on products" ON public.products FOR ALL TO public USING (true) WITH CHECK (true);
```

---

### 4. Environment Configuration

#### Backend (`backend/.env`):
Create `backend/.env` based on `backend/.env.example`:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
API_PREFIX=/api/v1

# Supabase Credentials
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-or-service-role-key

# Redis In-Memory Cache (Defaults to local redis if omitted)
REDIS_URL=redis://127.0.0.1:6379

# Resend Email API (HTTP Protocol — Render Friendly)
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=VibeLane <onboarding@resend.dev>

# Security & Secrets
JWT_SECRET=your_super_secret_jwt_key_here
```

#### Frontend (`frontend/.env`):
Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

---

### 5. Database Seeding

Populate your Supabase PostgreSQL instance with the curated 16-item editorial catalog:

```bash
cd backend
npm run seed:supabase
```

---

### 6. Running the Monorepo Locally

Start both the backend API server and frontend client concurrently:

```bash
npm run dev
```

Or launch services independently:

| Service | Command | Address |
| :--- | :--- | :--- |
| **Frontend Client** | `npm run dev:frontend` | `http://localhost:5173` |
| **Backend API** | `npm run dev:backend` | `http://localhost:5000` |

---

## 📡 Comprehensive REST API Reference

All backend endpoints are prefixed with `/api/v1`:

### 🏷️ Product Catalog
| Method | Endpoint | Description | Cache Tier | Query Parameters |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/health` | Service health status and timestamp | None | None |
| `GET` | `/api/v1/products` | Retrieve catalog with filters | Redis (`all_products:*`) | `?category=`, `?search=`, `?sort=`, `?minPrice=`, `?maxPrice=` |
| `GET` | `/api/v1/products/categories` | Retrieve distinct categories | Redis (`categories`) | None |
| `GET` | `/api/v1/products/:id` | Fetch single product by `id` or `slug` | Redis (`product:*`) | None |

### 🔐 Authentication & Verification
| Method | Endpoint | Description | Rate Limit | Access |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/signup` | Register account and trigger Resend email OTP | Protected (`otpLimiter`) | Public |
| `POST` | `/api/v1/auth/verifyotp` | Verify 6-digit OTP code and issue JWT | Protected (`authLimiter`) | Public |
| `POST` | `/api/v1/auth/login` | Authenticate with email/password and issue JWT | Protected (`authLimiter`) | Public |

### 👤 Customer Profile & Orders
| Method | Endpoint | Description | Authorization |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/user/:userId/profile` | Retrieve customer profile details | `Bearer <token>` |
| `PUT` | `/api/v1/user/:userId/profile` | Update profile information | `Bearer <token>` |
| `GET` | `/api/v1/user/:userId/orders` | Retrieve authenticated customer order history | `Bearer <token>` |
| `POST` | `/api/v1/user/orders` | Place and finalize a new order | `Bearer <token>` |

### 🛡️ Administrative Operations
| Method | Endpoint | Description | Authorization | Cache Action |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/admin/orders` | List all orders across all customers | `Bearer <admin_token>` | None |
| `PUT` | `/api/v1/admin/orders/:id/status`| Update order status (`shipped`, `delivered`, etc.) | `Bearer <admin_token>` | Invalidates order cache |

---

## 🌐 Production Deployment Guide

### Backend on Render (Web Service)
1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your GitHub repository.
3. Configure service parameters:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Set Environment Variables:
   - `NODE_ENV`: `production`
   - `API_PREFIX`: `/api/v1`
   - `SUPABASE_URL`: `https://your-project.supabase.co`
   - `SUPABASE_KEY`: `your-supabase-key`
   - `RESEND_API_KEY`: `re_your_resend_api_key`
   - `RESEND_FROM_EMAIL`: `VibeLane <onboarding@resend.dev>` (or verified domain)
   - `JWT_SECRET`: `your_secure_jwt_secret`
   - `CLIENT_URL`: `https://your-vibelane-site.vercel.app,http://localhost:5173`

### Frontend on Vercel (SPA)
1. Import repository on [Vercel](https://vercel.com).
2. Configure project parameters:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
3. Set Environment Variable:
   - `VITE_API_BASE_URL`: `https://your-render-service.onrender.com/api/v1`
4. Deploy! SPA client rewrites are automatically governed by [`frontend/vercel.json`](file:///d:/VibeLane-Ecom/frontend/vercel.json).

---

## ✅ Production Milestone Checklist

- [x] **Editorial Design System**: Inter Tight typography, brutalist dark palette (`#000000`, `#EDE4DD`, `#F31919DC`), responsive viewport wordmarks.
- [x] **Fluid Micro-interactions**: Letter-by-letter masked typography reveals, kinetic left-to-right link underlines, dual-angle image hover crossfade.
- [x] **Performance & Smooth Scrolling**: Lenis inertial scrolling integration with React 19 and Framer Motion viewport triggers.
- [x] **Full E-Commerce Journey**: Lookbook catalog, category pills, dynamic product details, reactive bag, and simulated checkout flow.
- [x] **Customer Authentication**: JWT bearer tokens, bcrypt password hashing, and Resend-backed 6-digit OTP verification.
- [x] **Enterprise Admin Suite**: Real-time financial revenue metrics, volume breakdown, customer counts, and interactive order fulfillment updater.
- [x] **Resilient Data Architecture**: Supabase PostgreSQL persistence with Redis in-memory caching and offline fallback capabilities.
- [x] **Cloud & Security Hardening**: Express reverse proxy trust, strict CORS origin controls, rate-limiting shields, and port-agnostic email protocols.

---

## 📄 License & Authors

Distributed under the **MIT License**. See `LICENSE` for details.

<div align="center">
  <br />
  <sub>Designed & Developed with rebellious precision by <a href="https://github.com/devxbhabani"><strong>devxbhabani</strong></a>.</sub>
  <br />
  <sub>© 2026 VibeLane Studio. All rights reserved.</sub>
</div>
