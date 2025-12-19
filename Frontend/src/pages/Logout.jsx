import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        // We call the logout endpoint. Even if it fails, 
        // we clear the local storage to ensure the user is "logged out" locally.
        axios.get(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }).catch((error) => {
            console.error('Logout error:', error);
            localStorage.removeItem('token');
            navigate('/login');
        });
    }, [navigate, token]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f7f5f0]">
            <div className="text-xl font-semibold text-slate-600">Logging you out...</div>
        </div>
    );
};

export default Logout;