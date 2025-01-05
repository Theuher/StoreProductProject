import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { clearToken, clearUser } from './authSlice';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';


export default function Home() {
  const navigate = useNavigate();
 const dispatch = useDispatch(); 
 const isAuthenticated = useAuth();
  // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const token = useSelector((state) => state.auth.token);
  const email = useSelector((state) =>  state.auth.user);
  
  const [users , setUsers] = useState([]);
  const [error , setError] = useState("");


  const handleLogOut = () => {
    // localStorage.removeItem('currentUser');
    dispatch(clearToken());
    dispatch(clearUser());
    navigate('/Login');
  };

  const handleGoToDashboard = () => {
    navigate('/Dashboard');
  };

  const handleRegistration = () => {
    navigate('/Reg');
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundColor: '#f8f9fa',
        overflow: 'hidden',
        padding: '20px',
      }}
    >
      <div
        className="text-center p-4 shadow-lg rounded-3 bg-white w-100"
        style={{ maxWidth: '600px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
      >
        {token ? (
          <>
            <h1 className="mb-3 text-primary">Тавтай морил, {email || 'User'}!</h1>
            <p className="mb-4 text-muted">Та нэвтэрсэн байна. Илүү ихийг үзэхийг хүсвэл ...</p>
            <div className="d-flex justify-content-center gap-3">
              { isAuthenticated && <button className="btn btn-primary btn-lg px-4 py-2" onClick={handleGoToDashboard}>
                Нүүр хуудас
              </button>}
              <button className="btn btn-danger btn-lg px-4 py-2" onClick={handleLogOut}>
                Гарах
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="mb-3 text-primary">Тавтай морил</h1>
            <p className="mb-4 text-muted">Нэвтэрч эсвэл бүртгүүлж шинэ боломжуудыг ашиглаарай.</p>
            <div className="d-flex justify-content-center gap-3">
              <button
                className="btn btn-info btn-lg px-4 py-2"
                onClick={() => navigate('/Login')}
              >
                Нэвтрэх
              </button>
              <button className="btn btn-success btn-lg px-4 py-2" onClick={handleRegistration}>
                Бүртгүүлэх
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}  