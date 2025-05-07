import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { clearToken, clearUser } from './authSlice';
import { useAuth } from './useAuth';

export default function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useAuth();
    const token = useSelector((state) => state.auth.token);
    const email = useSelector((state) => state.auth.user);

    const handleLogOut = () => {
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
                background: 'linear-gradient(to bottom right, #3498db, #8e44ad)',
                color: 'white',
                overflow: 'hidden',
                padding: '20px',
            }}
        >
            <div
                className="text-center p-5 shadow-lg rounded-3 bg-white w-100"
                style={{
                    maxWidth: '700px',
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                    borderRadius: '15px',
                }}
            >
                {token ? (
                    <>
                        <h1 className="mb-3 text-primary" style={{ fontSize: '2.5rem' }}>
                            Тавтай морил, {email || 'User'}!
                        </h1>
                        <p className="mb-4 text-muted" style={{ fontSize: '1.2rem' }}>
                            Та нэвтэрсэн байна. Илүү ихийг үзэхийг хүсвэл ...
                        </p>
                        <div className="d-flex justify-content-center gap-4">
                            {isAuthenticated && (
                                <button
                                    className="btn btn-primary btn-lg px-5 py-3"
                                    onClick={handleGoToDashboard}
                                    style={{
                                        background: '#2980b9',
                                        borderColor: '#2980b9',
                                        transition: 'background-color 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#1c6fa2')}
                                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#2980b9')}
                                >
                                    Нүүр хуудас
                                </button>
                            )}
                            <button
                                className="btn btn-danger btn-lg px-5 py-3"
                                onClick={handleLogOut}
                                style={{
                                    background: '#e74c3c',
                                    borderColor: '#e74c3c',
                                    transition: 'background-color 0.3s ease',
                                }}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = '#c0392b')}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = '#e74c3c')}
                            >
                                Гарах
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="mb-3 text-primary" style={{ fontSize: '2.5rem' }}>
                            Тавтай морил
                        </h1>
                        <p className="mb-4 text-muted" style={{ fontSize: '1.2rem' }}>
                            Нэвтэрч эсвэл бүртгүүлж шинэ боломжуудыг ашиглаарай.
                        </p>
                        <div className="d-flex justify-content-center gap-4">
                            <button
                                className="btn btn-info btn-lg px-5 py-3"
                                onClick={() => navigate('/Login')}
                                style={{
                                    background: '#16a085',
                                    borderColor: '#16a085',
                                    transition: 'background-color 0.3s ease',
                                }}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = '#1abc9c')}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = '#16a085')}
                            >
                                Нэвтрэх
                            </button>
                            <button
                                className="btn btn-success btn-lg px-5 py-3"
                                onClick={handleRegistration}
                                style={{
                                    background: '#2ecc71',
                                    borderColor: '#2ecc71',
                                    transition: 'background-color 0.3s ease',
                                }}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = '#27ae60')}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = '#2ecc71')}
                            >
                                Бүртгүүлэх
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
