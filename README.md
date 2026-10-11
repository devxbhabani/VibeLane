# VibeLane E-Commerce Platform

A high-fashion, brutalist lifestyle & e-commerce destination inspired by contemporary editorial fashion aesthetics. Built with **React 19**, **Vite**, **Tailwind CSS v4**, **Lenis Smooth Scroll**, and **Framer Motion** on the client, and backed by a robust **Node.js**, **Express**, and **MongoDB Atlas** API.

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
- **Design Tokens & Palette**:
   - Luxury Warm Cream (`#EDE4DD`), Pitch Black (`#000000`), Dark Charcoal (`#101010` / `#141414`), and Fashion Accent Selection (`#F31919DC`).

### Backend (RESTful API & Database Architecture)

- **Express.js (ES Modules)**:
   - Clean modular layered pattern (`controllers/`, `routes/`, `services/`, `models/`, `middleware/`, `config/`, `utils/`).
- **MongoDB Atlas & Mongoose**:
   - Robust `Product` schema storing dual perspectives (`primaryImage`, `hoverImage`), stock counts, categories, pricing, badges, and chronological indexing.
   - **Automated Database Seeding**: Pre-seeds a full 16-item curated lookbook collection on initial setup if the database is empty (`seedProducts.js`).
- **Operational Error Handling**:
   - Custom `AppError` class, `asyncHandler` wrappers, and centralized `errorHandler` middleware.
- **Standardized Response Shapes**:
   - Consistent JSON payloads across all endpoints via `ApiResponse`.

---

## Project Structure

```text
VibeLane-Ecom/
├── frontend/                     # Client Application (React 19 + Vite + Tailwind v4)
│   ├── public/                   # Static assets & minimalist favicon.svg
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
│   ├── index.html                # HTML entry with typography (Inter, Inter Tight)
│   ├── vite.config.js            # Vite config with @tailwindcss/vite & API reverse proxy
│   └── package.json
│
├── backend/                      # API Server (Node.js + Express + Mongoose)
│   ├── src/
│   │   ├── config/               # Database connection (db.js)
│   │   ├── controllers/          # Request handlers (productController.js, healthController.js)
│   │   ├── middleware/           # Middlewares (errorHandler.js, asyncHandler.js)
│   │   ├── models/               # Mongoose schema (Product.js)
│   │   ├── routes/               # Express API routes (productRoutes.js, index.js)
│   │   ├── scripts/              # Seed scripts (seedProducts.js)
│   │   ├── services/             # Business logic layer (productService.js, cartService.js)
│   │   ├── utils/                # API helpers (ApiResponse.js, AppError.js)
│   │   ├── app.js                # Express app setup & CORS configuration
│   │   └── server.js             # Server listener & bootstrap entrypoint
│   ├── .env.example              # Environment variables template
│   ├── .env                      # Local environment configuration
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
- **MongoDB**: Local MongoDB instance or free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 2. Install Dependencies

Install dependencies for both frontend and backend concurrently from the root directory:

```bash
npm run install:all
```

Or install them individually:

```bash
# Frontend
npm --prefix frontend install

# Backend
npm --prefix backend install
```

### 3. Configure Environment Variables

Create `backend/.env` with your settings (reference `backend/.env.example`):

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
API_PREFIX=/api/v1
MONGO_URI=your_mongodb_connection_string
```

### 4. Seed the Database (Optional)

To seed or reset the database with the curated 16-item editorial catalog:

```bash
cd backend
node src/scripts/seedProducts.js
```

### 5. Run the Application

Start both the backend server and frontend client concurrently:

```bash
npm run dev
```

Or run each service in separate terminals:

- **Frontend** (`http://localhost:5173`):
   ```bash
   npm run dev:frontend
   ```
- **Backend API** (`http://localhost:5000`):
   ```bash
   npm run dev:backend
   ```

---

## API Endpoints

All backend endpoints are prefixed with `/api/v1` (proxied in the frontend via `/api`):

| Method | Endpoint                      | Description                                                                                  |
| :----- | :---------------------------- | :------------------------------------------------------------------------------------------- |
| `GET`  | `/`                           | API status greeting                                                                          |
| `GET`  | `/api/v1/health`              | Health check timestamp and server status                                                     |
| `GET`  | `/api/v1/products`            | Fetch all products (supports `?category=`, `?search=`, `?sort=`, `?minPrice=`, `?maxPrice=`) |
| `GET`  | `/api/v1/products/categories` | Retrieve distinct categories                                                                 |
| `GET`  | `/api/v1/products/:id`        | Retrieve single product details by MongoDB `_id`, slug, or item number                       |

---

## Tech Stack & Libraries

- **Frontend**:
   - [React 19](https://react.dev/)
   - [Vite](https://vitejs.dev/)
   - [Tailwind CSS v4](https://tailwindcss.com/)
   - [React Router v7](https://reactrouter.com/)
   - [Lenis Scroll](https://lenis.darkroom.engineering/) (`lenis/react`)
   - [Framer Motion](https://www.framer.com/motion/)
   - [Lucide React](https://lucide.dev/) (Iconography)
   - Google Fonts: **Inter Tight** & **Inter**
- **Backend**:
   - [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
   - [Mongoose](https://mongoosejs.com/) & [MongoDB Atlas](https://www.mongodb.com/atlas)
   - [Cors](https://www.npmjs.com/package/cors) & [Morgan](https://www.npmjs.com/package/morgan)
- **Tooling**:
   - Concurrently, Oxlint, ES Modules

---

## License

This project is licensed under the [MIT License](LICENSE).
