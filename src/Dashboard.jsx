import React from "react";
import { useNavigate } from "react-router-dom";
import './Dashboard.css'; 

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('currentUser');
    navigate('/Home');
  };
  const handleHome = () => {
    navigate('/Home');
  };


  return (
    <div className="main">
      <div className="dashboard-container">
        <header className="menu-bar">
          <div className="menu-content">
            <h2 className="menu-title" onClick={handleHome}>TnT </h2>
            <ul className="nav">
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleHome}>Нүүр</a>
              </li>
              
              <li className="nav-item">
                <button className="btn logout-btn" onClick={handleLogOut}>Гарах</button>
              </li>
            </ul>
          </div>
        </header>

        <div className="main-content">
          <div className="container">
            <header>
              <h1 className="dashboard-title">Hello World!</h1>
            </header>
            <section>
              <h2 className="welcome-message">Тавтай морил!</h2>
              <p className="description">Манай веб хуудас.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
