import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

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
        'http://192.168.1.8:5000/api/users/login',
        { email, password },
        { timeout: 10000 }
      );

      const user = response.data;
      localStorage.setItem('currentUser', JSON.stringify(user));

      setErrorMessage(null);
      setEmail('');
      setPassword('');
      handleClick();
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data?.errorMessage || 'Нэвтрэлт амжилтгүй');
      } else if (error.code === 'ECONNABORTED') {
        setErrorMessage('Нэвтрэлт амжилтгүй боллоо. Дахин оролдоно уу.');
      } else {
        setErrorMessage('Сервертэй холбогдоход алдаа гарлаа.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-center mb-4">Нэвтрэх</h1>
        {errorMessage && <p className="text-danger text-center mb-3">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label"><b>Email</b></label>
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
            <label htmlFor="password" className="form-label"><b>Нууц үг</b></label>
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
            >
              {loading ? 'Түр хүлээнэ үү' : 'Нэвтрэх'}
            </button>
          </div>

          <p className="mt-3 text-center">
            Танд бүртгэл байхгүй юу? <a href="/reg">Бүртгүүлэх</a>
          </p>
        </form>
      </div>
    </div>
  );
}
