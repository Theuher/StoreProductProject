import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-vh-100 d-flex flex-column">
            {/* ---------------- NAVBAR ---------------- */}
            <nav
                className="navbar navbar-expand-lg navbar-dark px-4"
                style={{ backgroundColor: "#2c3e50" }}
            >
                <a className="navbar-brand fs-3 fw-bold" href="/">
                    🛒 Smart Store
                </a>

                <div className="ms-auto d-flex gap-3">
                    <button className="btn btn-outline-light" onClick={() => navigate("/Login")}>
                        Нэвтрэх
                    </button>
                    <button className="btn btn-light" onClick={() => navigate("/Reg")}>
                        Бүртгүүлэх
                    </button>
                </div>
            </nav>

            {/* ---------------- HERO / SEARCH SECTION ---------------- */}
            <div
                className="flex-grow-1 d-flex justify-content-center align-items-center text-center"
                style={{
                    background: "linear-gradient(to bottom right, #3498db, #8e44ad)",
                    padding: "40px",
                    color: "white"
                }}
            >
                <div style={{ maxWidth: "700px" }}>
                    <h1 className="mb-4 fw-bold" style={{ fontSize: "3rem" }}>
                        Бараа хайх
                    </h1>

                    <p className="mb-4 fs-5">
                        Дэлгүүрийн QR кодыг уншуулан барааны нэр эсвэл төрлөөр хайж, байршлыг нь шалгаарай.
                    </p>

                    <div className="input-group input-group-lg mt-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Барааны нэр хайх..."
                        />
                        <button className="btn btn-dark px-4">Хайх</button>
                    </div>
                </div>
            </div>

            {/* ---------------- NEWS SECTION ---------------- */}
            <div className="container py-5">
                <h2 className="text-center mb-4 fw-bold">📰 Дэлгүүрийн мэдээлэл</h2>

                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="p-4 shadow-sm bg-white rounded-3">
                            <h4>🎉 Шинэ бараа нэмэгдлээ</h4>
                            <p className="text-muted">
                                Манай дэлгүүрт шинэ бүтээгдэхүүнүүд ирсэн тул хайж үзээрэй!
                            </p>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="p-4 shadow-sm bg-white rounded-3">
                            <h4>📍 Дэлгүүрийн байршлын шинэчлэл</h4>
                            <p className="text-muted">
                                Барааны байрлал шинэчлэгдсэн тул хайлт ашиглан яг байршлыг харах боломжтой.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
