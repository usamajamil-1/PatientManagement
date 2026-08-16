import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, username, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="navbar-mark">+</span>
        <span>Patient Management</span>
      </div>
      {isAuthenticated && (
        <div className="navbar-actions">
          <span className="navbar-user">{username}</span>
          <button className="btn btn-ghost" onClick={handleLogout}>
            Log out
          </button>
        </div>
      )}
    </header>
  );
}
