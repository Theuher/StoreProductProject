import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleLogOut = () => {
    localStorage.removeItem('currentUser');
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
        {currentUser ? (
          <>
            <h1 className="mb-3 text-primary">Тавтай морил, {currentUser.user.email || 'User'}!</h1>
            <p className="mb-4 text-muted">Та нэвтэрсэн байна. Илүү ихийг үзэхийг хүсвэл ...</p>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-primary btn-lg px-4 py-2" onClick={handleGoToDashboard}>
                Нүүр хуудас
              </button>
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
