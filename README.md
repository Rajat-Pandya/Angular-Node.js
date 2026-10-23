# Employee Management System

A full-stack CRUD application built with **Angular 21** and a **Node.js / Express / TypeScript** API. It includes JWT authentication, employee management, product management, and interactive Swagger API documentation.

## About this project

This project was built by **Rajat Pandya** as a hands-on full-stack learning project. It was developed in **Antigravity IDE** using a **spec-driven development (SDD)** workflow — features were first described as specifications, then implemented and verified against them.

The goal was to practice clean backend layering (`routes → controllers → services → repositories → models`) while building a modern standalone Angular frontend with reactive forms, route guards via interceptors, and Angular Material components.

## Features

- User registration and login with JWT access tokens
- Protected employee CRUD API with pagination, department filter, and active-status filter
- Product CRUD API with soft deletes and pagination
- Angular frontend with login, registration, employee management, and practice components
- Request validation with Joi and centralized error handling
- Swagger/OpenAPI documentation served at `/api-docs`
- GitHub Actions CI for both applications

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | Angular 21, Angular Material, TypeScript, RxJS, SCSS |
| Backend | Node.js, Express 4, TypeScript, Sequelize |
| Database | PostgreSQL |
| Auth | JSON Web Tokens (JWT), bcrypt |
| Validation | Joi |
| API docs | Swagger UI / OpenAPI 3 |
| Tooling | npm, GitHub Actions |

## Repository structure

```text
.
├── Node.js Project/        # Express + TypeScript REST API
│   ├── src/
│   │   ├── config/         # Database and Swagger configuration
│   │   ├── controllers/    # HTTP request handlers
│   │   ├── interfaces/     # Shared TypeScript interfaces
│   │   ├── middleware/     # Auth, validation, and error middleware
│   │   ├── models/         # Sequelize models
│   │   ├── repositories/   # Database access layer
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic
│   │   └── utils/          # JWT and error helpers
│   └── .env.example        # Environment variable template
├── PracticeAngular/        # Angular 21 frontend
│   └── src/app/
│       ├── core/           # HTTP interceptor
│       ├── services/       # API clients
│       ├── login/          # Login page
│       ├── registration/   # Registration page
│       ├── emp-detail/     # Employee management page
│       └── ...             # Practice/demo components
└── .github/workflows/      # CI pipeline
```

## Prerequisites

- Node.js 20 or newer (CI uses Node 24)
- npm 11 or newer
- PostgreSQL 14 or newer
- Angular CLI is optional; the project uses local npm scripts

## Getting started

### 1. Backend API

```bash
cd "Node.js Project"
npm ci
cp .env.example .env
```

Update `.env` with your local PostgreSQL credentials, create the database (`riseDB` by default), then start the API:

```bash
npm run dev
```

The API runs on `http://localhost:3000` and Swagger UI is available at `http://localhost:3000/api-docs`.

### 2. Frontend

```bash
cd PracticeAngular
npm ci
npm start
```

Open `http://localhost:4200`. The frontend expects the API at `http://localhost:3000`.

## Environment variables

| Variable | Description | Example |
| --- | --- | --- |
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USER` | PostgreSQL user | `postgres` |
| `DB_PASSWORD` | PostgreSQL password | `your_password` |
| `DB_NAME` | Database name | `riseDB` |
| `PORT` | API port | `3000` |
| `NODE_ENV` | Runtime environment | `development` |
| `JWT_SECRET` | Secret used to sign access tokens | `your_long_random_secret` |
| `JWT_ACCESS_EXPIRATION` | Access token lifetime | `15m` |
| `JWT_REFRESH_EXPIRATION` | Refresh token lifetime | `1d` |

> Never commit your real `.env` file. Use `.env.example` as the template.

## API overview

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Log in and receive an access token |
| `GET` | `/api/employees` | List employees (paginated) |
| `GET` | `/api/employees/:id` | Get one employee |
| `POST` | `/api/employees` | Create an employee |
| `PUT` | `/api/employees/:id` | Update an employee |
| `DELETE` | `/api/employees/:id` | Soft delete an employee |
| `GET` | `/api/products` | List products (paginated) |
| `GET` | `/api/products/:id` | Get one product |
| `POST` | `/api/products` | Create a product |
| `PUT` | `/api/products/:id` | Update a product |
| `DELETE` | `/api/products/:id` | Soft delete a product |

Full request/response schemas are available in Swagger UI.

## Available scripts

### Backend

| Command | Description |
| --- | --- |
| `npm run dev` | Start the API with hot reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled API |

### Frontend

| Command | Description |
| --- | --- |
| `npm start` | Start the Angular dev server |
| `npm run build` | Create a production build |
| `npm test` | Run unit tests |

## License

This project is licensed under the [MIT License](LICENSE).
