import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !email || !repeatPass) {
      setErrorMessage('Бүх талбарыг бөглөнө үү');
      return;
    }

    if (password !== repeatPass) {
      setErrorMessage('Нууц үг таарахгүй байна.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        email,
        password,
      }, { timeout: 10000 });

      alert('Бүртгэл амжилттай!');
      setErrorMessage('');
      setEmail('');
      setPassword('');
      setRepeatPass('');
      handleClick();
      console.log(response.data);
    } catch (error) {
      setErrorMessage(error.response?.data?.errorMessage || 'Бүртгэл амжилтгүй');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-center mb-4">Бүртгүүлэх</h1>
        {errorMessage && <p className="text-danger text-center mb-3">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label"><b>Email</b></label>
            <input
              type="email"
              className="form-control form-control-lg"
              id="email"
              placeholder="И-мэйл хаягаа оруулна уу"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
            />
          </div>

          <div className="mb-3">
            <label htmlFor="repeatPassword" className="form-label"><b>Нууц үгээ давтаж оруулна уу</b></label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="repeatPassword"
              placeholder="Нууц үгээ дахин оруулна уу"
              value={repeatPass}
              onChange={(e) => setRepeatPass(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 btn-lg mb-3">
            Бүртгүүлэх
          </button>
          <button
            type="button"
            className="btn btn-link w-100 btn-lg"
            onClick={handleClick}
          >
            Нэвтрэх хэсэг рүү буцах
          </button>
        </form>
      </div>
    </div>
  );
}
