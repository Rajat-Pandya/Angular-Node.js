# PracticeAngular

The Angular 21 frontend for the [Employee Management System](../README.md). It provides authentication pages and an employee management dashboard backed by the [Node.js API](../Node.js%20Project/README.md).

This project was built by **Rajat Pandya** as a hands-on learning exercise using **Antigravity IDE** with a **spec-driven development (SDD)** workflow. It focuses on modern standalone components, reactive forms, route-level API calls, and Angular Material UI.

## Features

- Login page with JWT token storage
- Registration page with reactive-form validation and password matching
- HTTP interceptor that attaches `Authorization: Bearer <token>` to API requests
- Employee management page with add, list, and delete actions
- Practice components for component communication, routing, and forms
- Angular Material form fields and inputs
- Local fallback data when the backend is unavailable

## Tech stack

- Angular 21 (standalone components, signals)
- TypeScript 5.9
- Angular Material / CDK
- RxJS
- SCSS
- Vitest for unit tests

## Project structure

```text
src/app/
├── core/
│   └── auth.interceptor.ts     # Adds the JWT bearer token to requests
├── services/
│   ├── auth.service.ts         # Login and registration API client
│   └── employee.service.ts     # Employee API client
├── login/                      # Login page
├── registration/               # Registration page
├── emp-detail/                 # Employee management page
├── home/                       # Parent/child component demo
├── about/                      # About page
├── myself/                     # Profile-style demo page
├── job-application/            # Reactive form demo
├── navbar/                     # Shared navigation bar
├── app.routes.ts               # Application routes
└── app.config.ts               # Providers and HTTP interceptor setup
```

## Routes

| Path | Component |
| --- | --- |
| `/` | Login |
| `/login` | Login |
| `/registration` | Registration |
| `/home` | Home |
| `/emp-detail` | Employee management |
| `/about` | About |
| `/myself` | Myself |
| `/job-application` | Job application form |

The wildcard route redirects unknown paths to the login page.

## Prerequisites

- Node.js 20 or newer
- npm 11 or newer
- The backend API running on `http://localhost:3000`

## Getting started

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Open `http://localhost:4200`.

The API URLs are currently defined in `src/app/services/auth.service.ts` and `src/app/services/employee.service.ts`.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the Angular dev server |
| `npm run build` | Create a production build in `dist/` |
| `npm run watch` | Build continuously in development mode |
| `npm test` | Run unit tests |

## Backend integration

The frontend calls the API at `http://localhost:3000`:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/employees`
- `POST /api/employees`
- `DELETE /api/employees/:id`

Start the backend first using the instructions in [the API README](../Node.js%20Project/README.md).

## License

This project is licensed under the [MIT License](../LICENSE).
