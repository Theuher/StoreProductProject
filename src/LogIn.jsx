import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "./authSlice";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [savedEmails, setSavedEmails] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Load last used emails from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedEmails")) || [];
    setSavedEmails(stored);
  }, []);

  const saveEmailToLocal = (newEmail) => {
    let updated = [newEmail, ...savedEmails.filter((e) => e !== newEmail)];
    updated = updated.slice(0, 5); // limit to 5 emails
    localStorage.setItem("savedEmails", JSON.stringify(updated));
    setSavedEmails(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Бүх талбарыг бөглөнө үү");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        { email, password },
        { timeout: 10000 }
      );

      const token = response.data.user.token;
      console.log(response)
      dispatch(setToken(token));
      dispatch(setUser(response.data.user.user));


      saveEmailToLocal(email);

      setErrorMessage("");
      setEmail("");
      setPassword("");
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        navigate("/Dashboard");
      }, 1000);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.errorMessage ||
          "Сервертэй холбогдоход алдаа гарлаа."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundColor: "#f7f7f7",
        padding: "20px",
      }}
    >
      <div
        className="p-4 shadow-sm bg-white"
        style={{
          width: "100%",
          maxWidth: "360px",
          borderRadius: "14px",
          border: "1px solid #e5e5e5",
        }}
      >
        <h3 className="text-center mb-4" style={{ fontWeight: "600" }}>
          Нэвтрэх
        </h3>

        {errorMessage && (
          <div className="alert alert-danger py-2 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div className="mb-3 position-relative">
            <label className="form-label">И-мэйл</label>

            <input
              list="recent-emails"
              className="form-control"
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #dcdcdc",
              }}
              placeholder="И-мэйл хаяг"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />

            <datalist id="recent-emails">
              {savedEmails.map((em, i) => (
                <option key={i} value={em} />
              ))}
            </datalist>
          </div>

          {/* PASSWORD */}
          <div className="mb-3">
            <label className="form-label">Нууц үг</label>
            <input
              type="password"
              className="form-control"
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #dcdcdc",
              }}
              placeholder="Нууц үг"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="btn btn-dark w-100"
            style={{
              padding: "12px",
              borderRadius: "10px",
              fontWeight: "500",
            }}
            disabled={loading}
          >
            {loading ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
          </button>

          <p className="text-center mt-3" style={{ fontSize: "14px" }}>
            Бүртгэл байхгүй юу?{" "}
            <a href="/reg" style={{ textDecoration: "none" }}>
              Бүртгүүлэх
            </a>
          </p>
        </form>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4 text-center">
              <h5 className="text-success">Амжилттай!</h5>
              <p>Системд амжилттай нэвтэрлээ.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
