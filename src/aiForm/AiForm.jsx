import { useState } from "react";
import { DefaultAiModel } from "./aiModel.js";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
export default function AiForm({ onSaveSuccess }) {
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState(DefaultAiModel);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [searchClientName, setSearchClientName] = useState("");
    const [foundModels, setFoundModels] = useState([]);
    const token = useSelector((state) => state.auth.token);

    const save = async () => {
        if (!state.image || typeof state.image === "string") {
            alert("Зураг (file) сонгоно уу.");
            return;
        }

        setLoading(true);
        try {
            const base64Image = await toBase64(state.image);
            const payload = { ...state, image: base64Image };

            const response = await fetch("http://localhost:5000/aimodel/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Server error");

            const data = await response.json();
            console.log("Saved:", data);

            setShowSuccessDialog(true);
            setState(DefaultAiModel);
            if (onSaveSuccess) onSaveSuccess();

            setTimeout(() => {
                setShowSuccessDialog(false);
            }, 1000);
        } catch (error) {
            console.error("Save failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setState({ ...state, image: files[0] });
        } else {
            setState({ ...state, [name]: value });
        }
    };

    const fetchModels = async () => {
        if (!searchClientName.trim()) return;
        try {
            const response = await fetch(`http://localhost:5000/aimodel/get/all/ByName?name=${searchClientName}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Failed to fetch models");

            const data = await response.json();
            setFoundModels(data);
        } catch (error) {
            console.error("Error fetching models:", error);
        }
    };

    return (
        <div
            className="d-flex flex-column align-items-center min-vh-100"
            style={{
                background: "linear-gradient(to bottom right, #0062cc, #33ccff)",
                padding: "20px",
            }}
        >
            <button className='btn btn-primary' style={{ position: 'absolute', top: '20px', left: '20px' }} onClick={() => window.history.back()}>
                Буцах
        </button>
            <div className="card p-4 shadow-lg rounded w-100" style={{ maxWidth: "500px" }}>
                <h3 className="text-center mb-4 text-primary">Шинжилгээ илгээх форм</h3>

                <div className="mb-3">
                    <label className="form-label">Тайлбар</label>
                    <input name="name" type="text" className="form-control" value={state.name} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Хэрэглэгчийн нэр</label>
                    <input
                        name="clientName"
                        type="text"
                        className="form-control"
                        value={state.clientName}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Зураг</label>
                    <input
                        name="image"
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>

                <button onClick={save} className="btn btn-primary w-100 mt-3" disabled={loading}>
                    {loading ? "Хадгалж байна..." : "Хадгалах"}
                </button>
            </div>

            <div className="card mt-4 p-3 shadow-sm rounded w-100" style={{ maxWidth: "500px" }}>
                <h5 className="text-white">Хэрэглэгчийн нэрээр хайх</h5>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Хайх нэр..."
                        value={searchClientName}
                        onChange={(e) => setSearchClientName(e.target.value)}
                    />
                    <button className="btn btn-light" onClick={fetchModels}>
                        Хайх
                    </button>
                </div>
            </div>

            {/* Results */}
            <div className="mt-4 w-100 d-flex flex-wrap justify-content-center gap-3 px-3">
                {foundModels.map((model, index) => (
                    <div key={index} className="card p-3 shadow" style={{ width: "250px" }}>
                        <h5 className="text-primary">{model.name}</h5>
                        <p className="mb-1">Харилцагч: {model.clientName}</p>
                        <p className="mb-1">Бүртгэсэн Хэрэглэгч: {model.createdUser}</p>
                        <p className="mb-1">
                            Бүртгэсэн огноо: {new Date(model.createdDate).toISOString().split('T')[0]}
                        </p>

                        {model.image && (
                            <img
                                src={model.image}
                                alt="AI model"
                                className="img-fluid rounded mt-2"
                                style={{ maxHeight: "150px", objectFit: "cover" }}
                            />
                        )}
                        {model.generatedImage && (
                            <img
                                src={model.generatedImage}
                                alt="AI model"
                                className="img-fluid rounded mt-2"
                                style={{ maxHeight: "150px", objectFit: "cover" }}
                            />
                        )}
                    </div>
                ))}
            </div>

            {showSuccessDialog && (
                <div
                    className="position-fixed top-0 start-0 m-3 bg-success text-white p-3 rounded"
                    style={{ zIndex: 1050 }}
                >
                    <h5 className="text-center m-0">Амжилттай хадгалагдлаа!</h5>
                </div>
            )}
        </div>
    );
}
