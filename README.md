# Employee Management API

A REST API built with **Node.js**, **Express**, **TypeScript**, **Sequelize**, and **PostgreSQL**. It provides JWT authentication plus employee and product CRUD modules, with interactive Swagger documentation.

This is the backend of the [Employee Management System](../README.md). The project was developed as a hands-on learning exercise in **Antigravity IDE** using a **spec-driven development (SDD)** workflow: features were specified first, then implemented and checked against those specifications.

## Features

- JWT-based registration and login
- Password hashing with bcrypt
- Employee CRUD with pagination, department filter, and active-status filter
- Product CRUD with pagination and soft deletes
- Request validation with Joi
- Centralized error handling
- Swagger/OpenAPI 3 documentation
- Layered architecture: routes → controllers → services → repositories → models

## Tech stack

- Node.js + TypeScript (strict mode)
- Express 4
- Sequelize ORM with PostgreSQL
- jsonwebtoken + bcrypt
- Joi
- swagger-ui-express
- ts-node-dev for local development

## Project structure

```text
src/
├── app.ts                  # Express app and middleware wiring
├── server.ts               # Database connection and server bootstrap
├── config/
│   ├── database.ts         # Sequelize connection
│   └── swagger.ts          # OpenAPI document
├── controllers/            # Request/response handling
├── interfaces/             # Shared TypeScript types
├── middleware/             # Auth, validation, and error middleware
├── models/                 # Sequelize models
├── repositories/           # Database queries
├── routes/                 # Express routers
├── services/               # Business logic
└── utils/                  # JWT and HTTP error helpers
```

## Prerequisites

- Node.js 20 or newer
- npm 11 or newer
- PostgreSQL 14 or newer

## Setup

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Create your environment file:

   ```bash
   cp .env.example .env
   ```

3. Create a PostgreSQL database and update `.env` with your credentials.

4. Start the development server:

   ```bash
   npm run dev
   ```

The API starts on `http://localhost:3000`. Swagger UI is available at `http://localhost:3000/api-docs`.

Tables are created automatically with `sequelize.sync({ alter: true })` when the server starts.

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

> Keep your real `.env` file out of version control. Commit only `.env.example`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start with hot reload using ts-node-dev |
| `npm run build` | Compile TypeScript into `dist/` |
| `npm start` | Run the compiled app from `dist/server.js` |

## API endpoints

### Auth

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Log in and receive an access token |

### Employees

All employee endpoints require a `Bearer` token.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/employees?page=1&limit=10` | List employees |
| `GET` | `/api/employees/:id` | Get one employee |
| `POST` | `/api/employees` | Create an employee |
| `PUT` | `/api/employees/:id` | Update an employee |
| `DELETE` | `/api/employees/:id` | Soft delete an employee |

Optional employee filters: `department`, `isActive`.

### Products

All product endpoints require a `Bearer` token.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/products?page=1&limit=10` | List products |
| `GET` | `/api/products/:id` | Get one product |
| `POST` | `/api/products` | Create a product |
| `PUT` | `/api/products/:id` | Update a product |
| `DELETE` | `/api/products/:id` | Soft delete a product |

## Example request

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"johndoe@example.com","password":"your_password"}'
```

Use the returned `accessToken` as `Authorization: Bearer <token>` for protected routes.

## License

This project is licensed under the [MIT License](../LICENSE).
