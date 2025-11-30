import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, clearUser } from "./authSlice";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  
  // Safe access to user properties - extract values, not the object
  const email = user?.email || "Хэрэглэгч";
  const firstName = user?.firstName || user?.firstname || '';
  const lastName = user?.lastName || user?.lastname || '';
  const displayName = firstName && lastName ? `${firstName} ${lastName}` : email;
  const role = user?.userRole || user?.role || 'USER';

  useEffect(() => {
    if (!token) {
      navigate("/Home");
    }
  }, [token, navigate]);

  const handleLogOut = () => {
    dispatch(clearToken());
    dispatch(clearUser());
    navigate("/Home");
  };

  // Don't render the user object directly in JSX
  console.log("Dashboard user object:", user);

  return (
    <div className="dashboard-wrapper">

      {/* ==== TOP BAR ==== */}
      <header className="top-bar">
        <h2 className="logo">Dashboard</h2>
        <div className="top-right">
          <span className="user-email">{displayName}</span> {/* Use displayName, not user object */}
          <button className="logout-btn" onClick={handleLogOut}>
            Гарах
          </button>
        </div>
      </header>

      {/* ==== SIDE MENU ==== */}
      <aside className="sidebar">
        <h3 className="menu-title">Цэс</h3>
        <ul className="menu-list">
          <li onClick={() => navigate("/Dashboard")}>
            🏠 Нүүр
          </li>

          {/* Admin only items */}
          {(role === "ADMIN" || role === "admin" || role === "OWNER" || role === "owner") && (
            <>
              <li onClick={() => navigate("/report")}>
                📊 Тайлан
              </li>
              <li onClick={() => navigate("/add-product")}>
                ➕ Бараа нэмэх
              </li>
              <li onClick={() => navigate("/users")}>
                👥 Хэрэглэгчид
              </li>
            </>
          )}

          {/* Manager and Admin */}
          {(role === "ADMIN" || role === "admin" || role === "MANAGER" || role === "manager") && (
            <li onClick={() => navigate("/inventory")}>
              📦 Бараа материал
            </li>
          )}

          {/* Everyone */}
          <li onClick={() => navigate("/AiPage")}>
            🤖 AI шинжилгээ
          </li>
          <li onClick={() => navigate("/Profile")}>
            👤 Профайл
          </li>
        </ul>
      </aside>

      {/* ==== MAIN CONTENT ==== */}
      <main className="content-area">
        <h1>Тавтай морил, {displayName}</h1> {/* Use displayName here too */}
        <p className="sub-text">
          Танай Dashboard-ийн үндсэн хэсэг. Та цэснээс сонгон үйлдлээ хийнэ үү.
        </p>
        
        {/* Remove or fix the debug info that was rendering the user object */}
        {process.env.NODE_ENV === 'development' && user && (
          <div className="debug-info" style={{ 
            background: '#f8f9fa', 
            padding: '10px', 
            borderRadius: '5px', 
            marginTop: '20px',
            fontSize: '14px' 
          }}>
            <strong>Debug Info:</strong><br />
            User ID: {user.id}<br />
            Email: {user.email}<br />
            Role: {role}<br />
            Name: {firstName} {lastName}<br />
            Has Token: {token ? 'Yes' : 'No'}
          </div>
        )}
      </main>
    </div>
  );
}