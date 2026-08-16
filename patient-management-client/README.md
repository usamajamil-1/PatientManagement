# Patient Management System — Frontend

A React single-page application for managing patient records, built to
consume a JWT-secured ASP.NET Core Web API. Users authenticate with a
username and password, receive a JWT token, and can then create, view,
update, and delete patient records through a protected dashboard.

## Tech Stack

- **React 18** — UI library
- **React Router 6** — client-side routing and route protection
- **Axios** — HTTP client, with a request interceptor for JWT attachment
- **Vite** — build tool and dev server

## Prerequisites

- Node.js 18+ and npm
- The backend API running locally (see the backend README for setup).
  By default this app expects it at `http://localhost:5283`.

## Getting Started

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

> **Note:** The backend must have CORS configured to allow requests from
> `http://localhost:5173`, and must be running before you log in.

### Configuration

The API base URL is set in `.env`:

```
VITE_API_URL=http://localhost:5283/api
```

Update this if your backend runs on a different port.

### Test Credentials

The backend seeds a default account on first run:

```
Username: admin
Password: admin123
```

## Project Structure

```
src/
├── api/
│   ├── axiosInstance.js   # Shared Axios instance — attaches the JWT token
│   │                        to every outgoing request, and logs the user
│   │                        out automatically on a 401 response
│   ├── authService.js     # Login request (POST /api/auth/login)
│   └── patientService.js  # Patient CRUD requests
├── context/
│   └── AuthContext.jsx    # Global auth state: current token, username,
│                             login() and logout() functions
├── components/
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx # Redirects to /login if no valid token exists
│   ├── PatientForm.jsx    # Shared form for both creating and editing
│   └── PatientTable.jsx
├── pages/
│   ├── Login.jsx
│   └── Patients.jsx       # Main dashboard: list, add, edit, delete
├── App.jsx                # Route definitions
├── main.jsx                # App entry point (Router + AuthProvider)
└── index.css
```

## Application Flow

1. User submits credentials on `/login`.
2. On success, the JWT returned by the API is stored in `localStorage`
   and kept in `AuthContext`.
3. `/patients` is wrapped in `ProtectedRoute`, so unauthenticated users
   are redirected back to `/login`.
4. Every request made through `axiosInstance` automatically includes the
   `Authorization: Bearer <token>` header.
5. If the API ever responds with `401 Unauthorized` (missing, invalid,
   or expired token), the user is logged out and redirected to `/login`
   automatically.

## Available Scripts

| Command           | Description                          |
|--------------------|--------------------------------------|
| `npm run dev`      | Start the development server         |
| `npm run build`    | Build a production bundle            |
| `npm run preview`  | Preview the production build locally |
