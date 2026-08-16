import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Patients from "./pages/Patients";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <Patients />
            </ProtectedRoute>
          }
        />
        {/* Any unknown path just redirects to /patients (which itself
            redirects to /login if not authenticated) */}
        <Route path="*" element={<Navigate to="/patients" replace />} />
      </Routes>
    </>
  );
}
