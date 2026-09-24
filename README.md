# VibeLane E-Commerce Platform

A modern full-stack e-commerce experience inspired by high-fashion editorial brutalism. Built with **React 19**, **Vite**, **Tailwind CSS v4** on the frontend, and **Node.js**, **Express**, and **MongoDB Atlas** on the backend.

---

## Features & Architecture

### Frontend (Editorial & Brutalist UI)

- **Fluid Hero Typography (`HeroTitle.jsx`)**:
   - Massive, responsive viewport-scaling wordmark (`text-[19.8vw]`) set in Swiss Neo-Grotesque font (**Inter Tight 900**).
   - **Kinetic Letter-by-Letter Reveal**: Each character animates up smoothly through an overflow mask with staggered delays using custom easing curves (`cubic-bezier(0.16, 1, 0.3, 1)`).
   - Animated 5px structural divider line drawing left-to-right (`origin-left scale-x-0` to `scale-x-100`).
- **Lookbook Catalog (`Lookgrid.jsx`)**:
   - High-fashion portrait cards using `aspect-[9/12]` aspect ratio.
   - **Dual-Angle Hover Crossfade**: Smooth transition between the primary front view (`primaryImage`) and alternate/back angle (`hoverImage`) on hover.
   - Minimalist metadata bar with product name, price, and category tag (`● APPAREL`).
- **Decoupled Service Layer**:
   - `frontend/src/services/productService.js`: Centralized network requests and endpoint definitions.
   - `frontend/src/hooks/useProducts.js`: Custom React hook encapsulating product state, loading spinners, and error handling (zero inline `fetch` calls in components).
- **Tailwind CSS v4**: Powered by native `@tailwindcss/vite` plugin and modern CSS-first theme configuration.
- **Palette**: Luxury Warm Cream (`#EDE4DD`), Pitch Black (`#000000`), and Fashion Red (`#FF0001`) accent & selection.
- **Minimalist Favicon**: Custom monochrome Swiss geometric monogram (`favicon.svg`).

### Backend (RESTful API & Database)

- **Express.js (ES Modules)**: Modular layered architecture (`controllers/`, `routes/`, `services/`, `models/`, `middleware/`, `config/`, `utils/`).
- **MongoDB Atlas & Mongoose**:
   - `Product` schema storing dual images (`primaryImage` and `hoverImage`), stock quantities, prices, categories, and badges.
   - **Automatic Seeding**: Populates initial catalog if MongoDB collection is empty on startup.
- **Robust Error Handling**: Operational `AppError` class and centralized `errorHandler` middleware.
- **Standardized Response Shapes**: Uniform JSON format via `ApiResponse` utility.

---

## Project Structure

```text
VibeLane-Ecom/
├── frontend/                     # Client Application (React 19 + Vite + Tailwind v4)
│   ├── public/                   # Static assets & minimalist favicon.svg
│   ├── src/
│   │   ├── assets/               # Media & brand assets
│   │   ├── components/           # Reusable UI components
│   │   │   ├── hero/             # HeroTitle.jsx (kinetic masked typography)
│   │   │   ├── layout/           # Navbar.jsx, Footer.jsx
│   │   │   └── lookbook/         # Lookgrid.jsx (9:12 dual-image cards)
│   │   ├── context/              # Global state (AppContext.jsx)
│   │   ├── hooks/                # Custom React hooks (useProducts.js, useFetch.js)
│   │   ├── pages/                # Page components (Home.jsx)
│   │   ├── services/             # API services (productService.js, api.js)
│   │   ├── styles/               # CSS variables (variables.css) & Tailwind v4 (index.css)
│   │   ├── utils/                # Helper utilities & constants (constants.js)
│   │   ├── App.css               # Component styles
│   │   ├── App.jsx               # Application root layout
│   │   └── main.jsx              # React DOM entrypoint
│   ├── index.html                # SPA HTML shell with Google Fonts (Inter Tight)
│   ├── vite.config.js            # Vite config with @tailwindcss/vite & API proxy
│   └── package.json
│
├── backend/                      # API Server (Node.js + Express + Mongoose)
│   ├── src/
│   │   ├── config/               # Database connection (db.js)
│   │   ├── controllers/          # Request handlers (productController.js, healthController.js)
│   │   ├── middleware/           # Middlewares (errorHandler.js, asyncHandler.js)
│   │   ├── models/               # Mongoose schema (Product.js) & seed data (mockData.js)
│   │   ├── routes/               # Express API routes (index.js, productRoutes.js)
│   │   ├── services/             # Business logic layer (productService.js, cartService.js)
│   │   ├── utils/                # Response & Error helper classes (ApiResponse, AppError)
│   │   ├── app.js                # Express app setup & middleware pipeline
│   │   └── server.js             # Server listener & bootstrap entrypoint
│   ├── .env.example              # Environment variables template
│   ├── .env                      # Local environment secrets (MONGO_URI, PORT, etc.)
│   └── package.json
│
├── .gitignore                    # Unified Git ignore configuration
├── package.json                  # Root monorepo script runner (concurrently)
└── README.md                     # Project documentation & onboarding guide
```

---

## Getting Started

### 1. Install Dependencies

Install all dependencies across the root, frontend, and backend with a single command:

```bash
npm run install:all
```

Or install individually:

```bash
# Frontend
npm --prefix frontend install

# Backend
npm --prefix backend install
```

### 2. Configure Environment Variables

Create or update `backend/.env` based on `backend/.env.example`:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
API_PREFIX=/api/v1
MONGO_URI=your_mongodb_connection_string
```

### 3. Run Development Servers

Launch both the frontend (Vite) and backend (Node.js/Express) concurrently:

```bash
npm run dev
```

Or run each service independently:

- **Frontend only** (`http://localhost:5173`):
   ```bash
   npm run dev:frontend
   ```
- **Backend only** (`http://localhost:5000`):
   ```bash
   npm run dev:backend
   ```

---

## API Endpoints

All backend endpoints are prefixed with `/api/v1` (proxied in frontend via `/api`):

| Method | Endpoint                      | Description                                                                                     |
| :----- | :---------------------------- | :---------------------------------------------------------------------------------------------- |
| `GET`  | `/`                           | API Root Welcome Message                                                                        |
| `GET`  | `/api/v1/health`              | Service Health Status & Timestamp                                                               |
| `GET`  | `/api/v1/products`            | Retrieve all products (Supports `?category=`, `?search=`, `?sort=`, `?minPrice=`, `?maxPrice=`) |
| `GET`  | `/api/v1/products/categories` | Retrieve distinct product categories                                                            |
| `GET`  | `/api/v1/products/:id`        | Retrieve single product details by MongoDB `_id`, slug, or item number                          |

---

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Inter Tight (Google Fonts)
- **Backend**: Node.js, Express.js, Mongoose, Dotenv, Morgan, Cors, Nodemon
- **Database**: MongoDB Atlas
- **Tooling**: Concurrently, ES Modules
