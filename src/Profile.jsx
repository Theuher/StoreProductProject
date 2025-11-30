import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from './useAuth';
import { setUser, clearToken, clearUser } from './authSlice';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useAuth();
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    const [formData, setFormData] = useState({
        id:"",
        firstname: '',
        lastname: '',
        age: '',
        gender: '',
        image: ''
    });


    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/Login');
            return;
        }

            console.log('User from Redux:', user);
    console.log('User ID:', user?.id);

        // Load user data into form
        if (user) {
            setFormData({
                id : user.id || '',
                firstname: user.firstname || '',
                lastname: user.lastname || '',
                age: user.age || '',
                gender: user.gender || '',
                image: user.image || ''
            });
        }
    }, [isAuthenticated, user, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    image: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
        // Wrap formData inside `user` object
        const payload = { user: formData };

        const response = await axios.put(
            `http://localhost:5000/user/${user.id}`,
            payload,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Update Redux store with returned user
        if (response.data && response.data.user) {
            const updatedUser = response.data.user;
            dispatch(setUser({
                id:updatedUser.id , 
                firstname: updatedUser.firstname,
                lastname: updatedUser.lastname,
                age: updatedUser.age,
                gender: updatedUser.gender,
                image: updatedUser.image,
                userRole: updatedUser.userRole
            }));
        } else {
            dispatch(setUser(formData));
        }

        setSuccessMessage('Профайл амжилттай шинэчлэгдлээ!');
        setIsEditing(false);
    } catch (error) {
        if (error.response) {
            setErrorMessage(error.response.data?.error || 'Алдаа гарлаа');
        } else {
            setErrorMessage('Сервертэй холбогдоход алдаа гарлаа.');
        }
    } finally {
        setLoading(false);
    }
};


    const handleLogout = () => {
        dispatch(clearToken());
        dispatch(clearUser());
        navigate('/Home');
    };

    if (!isAuthenticated) {
        return null;
    }

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'ADMIN': return 'danger';
            case 'MANAGER': return 'warning';
            case 'EMPLOYEE': return 'info';
            default: return 'secondary';
        }
    };

    const getRoleLabel = (role) => {
        switch (role) {
            case 'ADMIN': return 'Админ';
            case 'MANAGER': return 'Менежер';
            case 'EMPLOYEE': return 'Ажилтан';
            case 'USER': return 'Хэрэглэгч';
            default: return role || 'Хэрэглэгч';
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', paddingTop: '20px', paddingBottom: '40px' }}>
            {/* Navigation Bar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
                <div className="container">
                    <a className="navbar-brand fw-bold" href="#" onClick={(e) => { e.preventDefault(); navigate('/Home'); }}>
                        🏪 Дэлгүүр
                    </a>
                    <div className="navbar-nav ms-auto">
                        <button
                            className="btn btn-outline-light btn-sm me-2"
                            onClick={() => navigate('/Home')}
                        >
                            Нүүр
                        </button>
                        <button
                            className="btn btn-outline-light btn-sm me-2"
                            onClick={() => navigate('/Dashboard')}
                        >
                            Дашбоард
                        </button>
                        <button
                            className="btn btn-outline-light btn-sm"
                            onClick={handleLogout}
                        >
                            Гарах
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card shadow-lg">
                            <div className="card-header bg-primary text-white">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h3 className="mb-0">Миний профайл</h3>
                                    {!isEditing && (
                                        <button
                                            className="btn btn-light btn-sm"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            ✏️ Засварлах
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="card-body">
                                {errorMessage && (
                                    <div className="alert alert-danger" role="alert">
                                        {errorMessage}
                                    </div>
                                )}

                                {successMessage && (
                                    <div className="alert alert-success" role="alert">
                                        {successMessage}
                                    </div>
                                )}

                                {isEditing ? (
                                    <form onSubmit={handleUpdate}>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="firstname" className="form-label fw-bold">Нэр</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="firstname"
                                                    name="firstname"
                                                    value={formData.firstname}
                                                    onChange={handleInputChange}
                                                    placeholder="Нэрээ оруулна уу"
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="lastname" className="form-label fw-bold">Овог</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="lastname"
                                                    name="lastname"
                                                    value={formData.lastname}
                                                    onChange={handleInputChange}
                                                    placeholder="Овгоо оруулна уу"
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="age" className="form-label fw-bold">Нас</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="age"
                                                    name="age"
                                                    value={formData.age}
                                                    onChange={handleInputChange}
                                                    placeholder="Насаа оруулна уу"
                                                    min="1"
                                                    max="150"
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="gender" className="form-label fw-bold">Хүйс</label>
                                                <select
                                                    className="form-select"
                                                    id="gender"
                                                    name="gender"
                                                    value={formData.gender}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">Сонгох</option>
                                                    <option value="Эр">Эр</option>
                                                    <option value="Эм">Эм</option>
                                                </select>
                                            </div>

                                            <div className="col-12 mb-3">
                                                <label htmlFor="image" className="form-label fw-bold">Профайл зураг</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="image"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                                {formData.image && (
                                                    <div className="mt-2">
                                                        <img
                                                            src={formData.image}
                                                            alt="Preview"
                                                            style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '10px' }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="d-flex gap-2">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={loading}
                                            >
                                                {loading ? 'Хадгалж байна...' : 'Хадгалах'}
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => {
                                                    setIsEditing(false);
                                                    setFormData({
                                                        firstname: user.firstname || '',
                                                        lastname: user.lastname || '',
                                                        age: user.age || '',
                                                        gender: user.gender || '',
                                                        image: user.image || ''
                                                    });
                                                    setErrorMessage('');
                                                    setSuccessMessage('');
                                                }}
                                            >
                                                Цуцлах
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div>
                                        <div className="row mb-4">
                                            <div className="col-md-4 text-center">
                                                {user?.image ? (
                                                    <img
                                                        src={user.image}
                                                        alt="Profile"
                                                        className="img-fluid rounded-circle mb-3"
                                                        style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    <div
                                                        className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mb-3 mx-auto"
                                                        style={{ width: '200px', height: '200px' }}
                                                    >
                                                        <span style={{ fontSize: '4rem', color: 'white' }}>👤</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="col-md-8">
                                                <h2 className="mb-3">
                                                    {user?.firstname && user?.lastname
                                                        ? `${user.firstname} ${user.lastname}`
                                                        : user?.email || 'Хэрэглэгч'}
                                                </h2>
                                                <p className="text-muted mb-2">
                                                    <strong>И-мэйл:</strong> {user?.email || 'Тодорхойгүй'}
                                                </p>
                                                {user?.age && (
                                                    <p className="text-muted mb-2">
                                                        <strong>Нас:</strong> {user.age}
                                                    </p>
                                                )}
                                                {user?.gender && (
                                                    <p className="text-muted mb-2">
                                                        <strong>Хүйс:</strong> {user.sex}
                                                    </p>
                                                )}
                                                <p className="mb-2">
                                                    <span className={`badge bg-${getRoleBadgeColor(user?.userRole)}`}>
                                                        {getRoleLabel(user?.userRole)}
                                                    </span>
                                                </p>
                                                {user?.createdAt && (
                                                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                                                        <strong>Бүртгэл үүссэн:</strong>{' '}
                                                        {new Date(user.createdAt).toLocaleDateString('mn-MN')}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <hr />

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <strong>Хэрэглэгчийн ID:</strong>
                                                <p className="text-muted">{user?.id || 'Тодорхойгүй'}</p>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <strong>Нэр:</strong>
                                                <p className="text-muted">{user?.firstname || 'Оруулаагүй'}</p>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <strong>Овог:</strong>
                                                <p className="text-muted">{user?.lastname || 'Оруулаагүй'}</p>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <strong>Нас:</strong>
                                                <p className="text-muted">{user?.age || 'Оруулаагүй'}</p>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <strong>Хүйс:</strong>
                                                <p className="text-muted">{user?.sex || 'Оруулаагүй'}</p>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <strong>Эрх:</strong>
                                                <p>
                                                    <span className={`badge bg-${getRoleBadgeColor(user?.userRole)}`}>
                                                        {getRoleLabel(user?.userRole)}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

