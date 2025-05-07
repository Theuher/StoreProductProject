import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from './authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate('/Home');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !email) {
      setErrorMessage('Бүх талбарыг бөглөнө үү');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
          'http://localhost:5000/auth/login',
          { email, password },
          { timeout: 10000 }
      );

      const token = response.data.user.token;
      dispatch(setToken(token));
      dispatch(setUser(response.data.user.email));

      setErrorMessage('');
      setEmail('');
      setPassword('');
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        handleClick();
      }, 1000);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data?.errorMessage || 'Нэвтэрэлт амжилтгүй');
      } else if (error.code === 'ECONNABORTED') {
        setErrorMessage('Нэвтэрэлт амжилтгүй боллоо. Дахин оролдоно уу.');
      } else {
        setErrorMessage('Сервертэй холбогдоход алдаа гарлаа.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
      <div
          className="d-flex justify-content-center align-items-center min-vh-100"
          style={{
            backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(0,123,255,0.6)), url('https://images.unsplash.com/photo-1581092334600-22bff7fc35ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '20px',
          }}
      >
        <div className="card p-4 shadow-lg bg-light" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
          <h1 className="text-center mb-4 text-primary">Нэвтрэх</h1>
          {errorMessage && <p className="text-danger text-center mb-3">{errorMessage}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">Email</label>
              <input
                  type="text"
                  className="form-control form-control-lg"
                  id="email"
                  placeholder="И-мэйл хаягаа оруулна уу"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">Нууц үг</label>
              <input
                  type="password"
                  className="form-control form-control-lg"
                  id="password"
                  placeholder="Нууц үгээ оруулна уу"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
              />
            </div>

            <div className="d-grid">
              <button
                  type="submit"
                  className="btn btn-primary w-100 btn-lg"
                  disabled={loading}
                  style={{ transition: '0.3s' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#0d6efd'}
              >
                {loading ? 'Түр хүлээнэ үү' : 'Нэвтрэх'}
              </button>
            </div>

            <p className="mt-3 text-center">
              Танд бүртгэл байхгүй юу? <a style={{textDecoration:"none"}} href="/reg">Бүртгүүлэх</a>
            </p>
          </form>
        </div>

        {showSuccess && (
            <div
                className="modal d-block"
                tabIndex="-1"
                style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content text-center">
                  <div className="modal-header">
                    <h5 className="modal-title text-success">Амжилттай нэвтэрлээ!</h5>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowSuccess(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>Тавтай морилно уу.</p>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}
