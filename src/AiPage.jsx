import React from 'react';
import {useNavigate} from "react-router-dom";

const AiPage = () => {
    const navigate = useNavigate();
    const pageStyle = {
        height: '100vh',
        backgroundImage: `
            linear-gradient(to bottom right, rgba(0, 123, 255, 0.7), rgba(0, 0, 0, 0.7)),
            url('https://images.unsplash.com/photo-1581092334600-22bff7fc35ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '20px'
    };

    const cardStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '40px',
        borderRadius: '15px',
        maxWidth: '600px',
        width: '90%'
    };

    return (
        <div style={pageStyle}>
            <button className='btn btn-primary' style={{ position: 'absolute', top: '20px', left: '20px' }} onClick={() => window.history.back()}>
                Нүүр хуудас руу буцах
                </button>
            <div style={cardStyle}>
                <h1 className="display-4 fw-bold mb-3">🧠 Шинжилгээний Модел</h1>
                <p className="lead mb-4">Тархины зургаа оруулан мэдээллээ аваарай.</p>
                <button className="btn btn-lg btn-outline-light" onClick={() => navigate('/AiForm')}>Мэдээлэл оруулах</button>
            </div>
        </div>
    );
};

export default AiPage;
