import React from "react";
import { useNavigate } from "react-router-dom";
import './Dashboard.css';
import { useDispatch } from "react-redux";
import { clearToken, clearUser } from "./authSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const email = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const handleLogOut = () => {
    dispatch(clearToken());
    dispatch(clearUser());
    setUsers([]);
    navigate('/Home');
  };
  const handleHome = () => {
    navigate('/Home');
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      console.log(token);
      if (!token) {
        setError("Token oldsonguie dahin nevterne uu");
        setUsers([]);
        return;
      }

      const response = await axios.get(
          'http://localhost:5000/allUsers',
          {
            headers: { Authorization: `Bearer ${token}` }
          });
      console.log(response.data);
      if (Array.isArray(response.data.usersList)) {
        setUsers(response.data.usersList);
      }
      else if (response.data.usersList) {
        setUsers(response.data.usersList)
      } else {
        setError("buruu butetstei hariu");
      }
    } catch (error) {
      console.log("aldaa garlaa: ", error);
      setError("Hereglegchdiig avahad aldaa garlaa , dahin oroldono uu");
      if (error.response && error.response.status === 401) {
        setUsers([]);
      }
    }
  };

  return (
      <div className="main">
        <div className="dashboard-container">
          <header className="menu-bar">
            <div className="menu-content">
              <h2 className="menu-title" onClick={handleHome}>{email || 'User'}</h2>
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
            <button className="btn btn-success" onClick={() => navigate('/AiPage')}>
              <i className="bi bi-brain"></i> AI шинжилгээ
            </button>
            <div className="container">
              <section className="my-4">
                <h2 className="welcome-message text-center text-primary">Бүх хэрэглэгчид</h2>
                <div className="text-center mb-3">
                </div>
                <p className="description text-center">Манай веб хуудасны хэрэглэгчид</p>
              </section>
            </div>
          </div>

          <div className="container">
            <div className="row justify-content-center">
              {users.length > 0 ? (
                  users.map((user) => (
                      <div key={user.id} className="col-md-6 col-lg-4 mb-4">
                        <div className="card shadow-sm rounded" style={{ border: '2px solid #007bff' }}>
                          <div className="card-body">
                            <h5 className="card-title">Хэрэглэгчийн ID: {user.id}</h5>
                            <p className="card-text"><strong>Email:</strong> {user.email}</p>
                            <p className="card-text"><strong>Нууц үг:</strong> {user.password}</p>
                          </div>
                        </div>
                      </div>
                  ))
              ) : (
                  <div className="col-12">
                    <div className="card shadow-sm rounded">
                      <div className="card-body text-center">
                        <p className="card-text">Хэрэглэгчид олдсонгүй, дахин нэвтэрнэ үү</p>
                      </div>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}
