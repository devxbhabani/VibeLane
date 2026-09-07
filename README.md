# VibeLane E-Commerce Platform

A modern full-stack e-commerce boilerplate built with **React (Vite)** on the frontend and **Node.js (Express)** on the backend.

---

## Project Structure

```text
VibeLane-Ecom/
├── frontend/                   # React + Vite Frontend application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/             # Images, SVGs, media
│   │   ├── components/         # Reusable UI components
│   │   │   ├── common/         # Buttons, Badges, Modals, Inputs
│   │   │   └── layout/         # Navbar, Footer, Sidebar
│   │   ├── context/            # React Contexts (AppContext, CartContext)
│   │   ├── hooks/              # Custom React hooks (useFetch, etc.)
│   │   ├── pages/              # View pages (Home, Shop, Cart, etc.)
│   │   ├── services/           # API integration service layer
│   │   ├── styles/             # Global CSS and Design Tokens (variables.css)
│   │   ├── utils/              # Helper utilities and constants
│   │   ├── App.jsx             # Main App layout
│   │   └── main.jsx            # React root mount
│   ├── index.html
│   ├── vite.config.js          # Vite config with API proxy
│   └── package.json
│
├── backend/                    # Node.js + Express Backend service
│   ├── src/
│   │   ├── config/             # DB & environmental configurations (db.js)
│   │   ├── controllers/        # Route logic handlers (healthController.js)
│   │   ├── middleware/         # Custom middlewares (errorHandler.js, asyncHandler.js)
│   │   ├── models/             # Schemas & data models (mockData.js)
│   │   ├── routes/             # Express API routes (index.js)
│   │   ├── services/           # Core business logic services
│   │   ├── utils/              # Response & Error helper classes (ApiResponse, AppError)
│   │   ├── app.js              # Express app setup & middleware pipeline
│   │   └── server.js           # Server listener & entrypoint
│   ├── .env.example            # Environment variables template
│   ├── .env                    # Local environment variables
│   └── package.json
│
├── .gitignore                  # Combined Git ignore configuration
├── package.json                # Root package for running client & server concurrently
└── README.md                   # Documentation and onboarding guide
```

---

## Quick Start

### 1. Install Dependencies

You can install dependencies across the whole project with:

```bash
# From the project root
npm run install:all
```

Or install separately:
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 2. Configure Environment Variables

The backend includes a pre-configured `.env` file based on `.env.example`:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
API_PREFIX=/api/v1
```

### 3. Run the Development Environment

Run both frontend and backend concurrently:
```bash
npm run dev
```

Or run each independently:

- **Frontend only** (http://localhost:5173):
  ```bash
  npm run dev:frontend
  ```
- **Backend only** (http://localhost:5000):
  ```bash
  npm run dev:backend
  ```

---

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API Root Welcome Message |
| `GET` | `/api/v1/health` | Service Health Status & Timestamp |
