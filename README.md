# VibeLane E-Commerce Platform

A high-fashion, brutalist lifestyle & e-commerce destination inspired by contemporary editorial fashion aesthetics. Built with **React 19**, **Vite**, **Tailwind CSS v4**, **Lenis Smooth Scroll**, and **Framer Motion** on the client, and backed by a robust **Node.js**, **Express**, and **Supabase (PostgreSQL)** API service.

---

## Features & Architecture

### Frontend (Editorial Brutalism & Kinetic Micro-interactions)

- **Kinetic Hero Typography (`HeroTitle.jsx`)**:
   - Viewport-scaling wordmark (`text-[19.8vw]`) set in Swiss Neo-Grotesque (**Inter Tight 900**).
   - Letter-by-letter masked reveal with staggered randomized entry animations (`cubic-bezier(0.16, 1, 0.3, 1)`).
   - Kinetic animated structural divider rule expanding on page mount.
- **Dynamic Asymmetric Lookbook (`Lookgrid.jsx`)**:
   - Editorial staggered grid with dynamic column/row spanning and custom aspect ratios (`aspect-[3/4]`, `aspect-[4/5]`, etc.).
   - **Dual-Angle Hover Crossfade**: Smooth transition between the primary front view (`primaryImage`) and alternate angle (`hoverImage`) on hover.
   - **Interactive Category Filtering**: Real-time category filter pills with live item count badges.
   - **Left-to-Right Animated Underlines**: Pseudo-element underline effect that grows seamlessly from left to right on card hover (`group-hover:after:w-full`) and direct link hover.
   - **Scroll-Triggered Reveals**: Smooth fade-and-slide up animations via **Framer Motion** (`whileInView`).
- **Smooth Inertial Scrolling (`lenis/react`)**:
   - Global smooth scrolling powered by Lenis (`ReactLenis`), providing an ultra-fluid editorial luxury feel.
- **Manifesto & Brand Narrative (`Manifesto.jsx`)**:
   - Bold, impactful brand statement section with animated kinetic divider lines and author signature.
- **Privacy Policy & Terms Pages (`Privacy.jsx`, `Terms.jsx`)**:
   - Structured editorial legal pages with categorized numbered blocks (`01`–`05`), Lucide iconography, interactive contact cards, and responsive layouts.
- **Unified Navigation & Modern Footer (`Footer.jsx`)**:
   - City coordinates, live year mark, legal links with word-fitted kinetic underlines, and social links.
- **Decoupled Architecture**:
   - Centralized API & service layer (`services/productService.js`, `hooks/useProducts.js`).
   - React Router v7 (`react-router-dom`) with multi-route setup (`/`, `/privacy`, `/terms`).
   - Production-ready SPA routing fallback via `vercel.json`.
- **Design Tokens & Palette**:
   - Luxury Warm Cream (`#EDE4DD`), Pitch Black (`#000000`), Dark Charcoal (`#101010` / `#141414`), and Fashion Accent Selection (`#F31919DC`).

### Backend (RESTful API & Database Architecture)

- **Express.js (ES Modules)**:
   - Clean modular layered pattern (`controllers/`, `routes/`, `services/`, `middleware/`, `config/`, `utils/`).
   - Multi-origin CORS support with automatic trimming and `*.vercel.app` support.
- **PostgreSQL on Supabase**:
   - Cloud relational database managed via `@supabase/supabase-js`.
   - Structured `products` table schema with Row Level Security (RLS) policies and performance indexes.
   - **Automated Database Seeding**: Pre-seeds a full 16-item curated lookbook collection via `npm run seed:supabase`.
- **Operational Error Handling**:
   - Custom `AppError` class, `asyncHandler` wrappers, and centralized `errorHandler` middleware.
- **Standardized Response Shapes**:
   - Consistent JSON payloads across all endpoints via `ApiResponse`.

---

## 📁 Project Structure

```text
VibeLane-Ecom/
├── frontend/                     # Client Application (React 19 + Vite + Tailwind v4)
│   ├── public/                   # Static assets, product images & favicon
│   ├── src/
│   │   ├── assets/               # Brand assets & static media
│   │   ├── components/           # Reusable UI components
│   │   │   ├── hero/             # HeroTitle.jsx (kinetic masked typography)
│   │   │   ├── layout/           # Navbar.jsx, Footer.jsx, Manifesto.jsx, Privacy.jsx, Terms.jsx
│   │   │   └── lookbook/         # Lookgrid.jsx (staggered editorial grid & hover states)
│   │   ├── context/              # App state (AppContext.jsx)
│   │   ├── hooks/                # Custom React hooks (useProducts.js, useFetch.js)
│   │   ├── pages/                # Page views (Home.jsx)
│   │   ├── services/             # API client & services (productService.js, api.js)
│   │   ├── styles/               # Design tokens (index.css)
│   │   ├── utils/                # Constants & helpers (constants.js)
│   │   ├── App.jsx               # Application root layout with Lenis & React Router
│   │   └── main.jsx              # React DOM 19 entrypoint
│   ├── .env.example              # Frontend environment variables template
│   ├── index.html                # HTML entry with typography (Inter, Inter Tight)
│   ├── vercel.json               # SPA rewrites for Vercel deployment
│   ├── vite.config.js            # Vite config with @tailwindcss/vite & API reverse proxy
│   └── package.json
│
├── backend/                      # API Server (Node.js + Express + Supabase PostgreSQL)
│   ├── src/
│   │   ├── config/               # Supabase client & DB connection (db.js)
│   │   ├── controllers/          # Request handlers (productController.js, healthController.js)
│   │   ├── middleware/           # Middlewares (errorHandler.js, asyncHandler.js)
│   │   ├── models/               # Mock data fallback (mockData.js)
│   │   ├── routes/               # Express API routes (productRoutes.js, index.js)
│   │   ├── scripts/              # Seed scripts (seedSupabase.js)
│   │   ├── services/             # Business logic layer (productService.js, cartService.js)
│   │   ├── utils/                # API helpers (ApiResponse.js, AppError.js)
│   │   ├── app.js                # Express app setup & CORS configuration
│   │   └── server.js             # Server listener & bootstrap entrypoint
│   ├── supabase_schema.sql       # PostgreSQL table schema and RLS policies
│   ├── .env.example              # Backend environment variables template
│   ├── .env                      # Local backend environment configuration
│   └── package.json
│
├── .gitignore                    # Root gitignore rules
├── package.json                  # Workspace script runner (concurrently)
└── README.md                     # Project documentation
```

---

## Getting Started

### 1. Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Supabase Account**: Free project created on [supabase.com](https://supabase.com)

### 2. Install Dependencies

Install dependencies for both frontend and backend concurrently from the root directory:

```bash
npm run install:all
```

Or individually:

```bash
# Frontend
npm --prefix frontend install

# Backend
npm --prefix backend install
```

### 3. Database Setup (Supabase PostgreSQL)

1. Open your Supabase Project **SQL Editor**.
2. Run the SQL script found in `backend/supabase_schema.sql`:

   ```sql
   CREATE TABLE IF NOT EXISTS public.products (
     id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
     item_number VARCHAR(100) NOT NULL,
     name VARCHAR(255) NOT NULL,
     slug VARCHAR(255),
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

### 4. Configure Environment Variables

#### Backend (`backend/.env`):

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
API_PREFIX=/api/v1
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-publishable-or-anon-key
```

#### Frontend (`frontend/.env`):

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

### 5. Seed Database

Seed the curated 16-item lookbook into your Supabase database:

```bash
cd backend
npm run seed:supabase
```

### 6. Run the Application Locally

Start both backend server and frontend client concurrently:

```bash
npm run dev
```

Or in separate terminal tabs:

- **Frontend** (`http://localhost:5173`):
   ```bash
   npm run dev:frontend
   ```
- **Backend API** (`http://localhost:5000`):
   ```bash
   npm run dev:backend
   ```

---

## 🌐 Deployment Guide

### Backend on Render

1. Create a new **Web Service** on [Render](https://dashboard.render.com).
2. Connect your Git repository.
3. Configure settings:
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Set Environment Variables:
   - `NODE_ENV`: `production`
   - `API_PREFIX`: `/api/v1`
   - `SUPABASE_URL`: `https://your-project.supabase.co`
   - `SUPABASE_KEY`: `your-supabase-key`
   - `CLIENT_URL`: `https://your-vibelane-site.vercel.app,http://localhost:5173`

### Frontend on Vercel

1. Import repository on [Vercel](https://vercel.com).
2. Configure settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
3. Set Environment Variable:
   - `VITE_API_BASE_URL`: `https://your-render-service.onrender.com/api/v1`
4. Deploy!

---

## API Endpoints

All backend endpoints are prefixed with `/api/v1`:

| Method | Endpoint                      | Description                                                                                  |
| :----- | :---------------------------- | :------------------------------------------------------------------------------------------- |
| `GET`  | `/`                           | API greeting & health check                                                                  |
| `GET`  | `/api/v1/health`              | Health check timestamp and server status                                                     |
| `GET`  | `/api/v1/products`            | Fetch all products (supports `?category=`, `?search=`, `?sort=`, `?minPrice=`, `?maxPrice=`) |
| `GET`  | `/api/v1/products/categories` | Retrieve distinct product categories                                                         |
| `GET`  | `/api/v1/products/:id`        | Retrieve single product by numeric `id`, slug, or item number                                |

---

## Tech Stack

- **Frontend**:
   - [React 19](https://react.dev/) & [Vite](https://vitejs.dev/)
   - [Tailwind CSS v4](https://tailwindcss.com/)
   - [React Router v7](https://reactrouter.com/)
   - [Lenis Scroll](https://lenis.darkroom.engineering/) (`lenis/react`)
   - [Framer Motion](https://www.framer.com/motion/)
   - [Lucide React](https://lucide.dev/)
- **Backend & Database**:
   - [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
   - [Supabase](https://supabase.com/) (PostgreSQL & `@supabase/supabase-js`)
   - [Cors](https://www.npmjs.com/package/cors) & [Morgan](https://www.npmjs.com/package/morgan)
- **Deployment**:
   - Frontend: [Vercel](https://vercel.com/)
   - Backend: [Render](https://render.com/)

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Current Status

The Website is under development.
