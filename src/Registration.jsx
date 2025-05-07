import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

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
      });

      setShowSuccess(true);
      setErrorMessage('');
      setEmail('');
      setPassword('');
      setRepeatPass('');
      console.log(response.data);
    } catch (error) {
      setErrorMessage(error.response?.data?.errorMessage || 'Бүртгэл амжилтгүй');
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
          <h1 className="text-center mb-4 text-primary">Бүртгүүлэх</h1>
          {errorMessage && <p className="text-danger text-center mb-3">{errorMessage}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">Email</label>
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
              <label htmlFor="password" className="form-label fw-bold">Нууц үг</label>
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
              <label htmlFor="repeatPassword" className="form-label fw-bold">Нууц үгээ дахин оруулна уу</label>
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

            <button
                type="submit"
                className="btn btn-primary w-100 btn-lg mb-3"
                style={{ transition: '0.3s' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#0d6efd'}
            >
              Бүртгүүлэх
            </button>

            <button
                type="button"
                className="btn btn-outline-secondary w-100 btn-lg"
                onClick={handleClick}
            >
              Нэвтрэх хэсэг рүү буцах
            </button>
          </form>
        </div>

        {/* Success Modal */}
        {showSuccess && (
            <div
                className="modal d-block"
                tabIndex="-1"
                style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content text-center">
                  <div className="modal-header">
                    <h5 className="modal-title text-success">Амжилттай бүртгэгдлээ!</h5>
                    <button type="button" className="btn-close" onClick={() => {
                      setShowSuccess(false);
                      handleClick();
                    }}></button>
                  </div>
                  <div className="modal-body">
                    <p>Та одоо нэвтрэх боломжтой боллоо.</p>
                  </div>
                  <div className="modal-footer">
                    <button
                        onClick={() => {
                          setShowSuccess(false);
                          handleClick();
                        }}
                        className="btn btn-primary"
                    >
                      Нэвтрэх
                    </button>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}
