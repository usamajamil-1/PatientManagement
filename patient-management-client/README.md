# Patient Management — React Frontend

## Setup

```
npm install
npm run dev
```

App khulega: `http://localhost:5173`

**Zaroori:** Backend (.NET) already `http://localhost:5283` par chal raha hona chahiye,
aur `Program.cs` mein CORS policy mein origin `http://localhost:5173` allow hona chahiye.

Agar backend kisi aur port par chalta hai, `.env` file mein `VITE_API_URL` badal do.

## Folder Structure

```
src/
├── api/
│   ├── axiosInstance.js   → axios setup + JWT token auto-attach + 401 handling
│   ├── authService.js     → login API call
│   └── patientService.js  → patient CRUD API calls
├── context/
│   └── AuthContext.jsx    → global login state (token, username, login, logout)
├── components/
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx → blocks /patients route if not logged in
│   ├── PatientForm.jsx    → add/edit form (same form, two modes)
│   └── PatientTable.jsx
├── pages/
│   ├── Login.jsx
│   └── Patients.jsx       → main CRUD page
├── App.jsx                → routes
├── main.jsx                → entry point, wraps app in AuthProvider + BrowserRouter
└── index.css
```

## Flow

1. `/login` → calls `POST /api/auth/login` → saves JWT token in `localStorage`
2. `/patients` is wrapped in `ProtectedRoute` → redirects to `/login` if no token
3. Every API call goes through `axiosInstance`, which automatically attaches
   `Authorization: Bearer <token>` to every request
4. If the backend ever returns `401`, the interceptor logs the user out automatically

## Test login (matches the seeded user in your backend)

```
Username: admin
Password: admin123
```
