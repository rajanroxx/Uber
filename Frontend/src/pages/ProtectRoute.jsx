import React, { useContext } from 'react';
import { UserContext } from '../context/userContext'; // Ensure this path is correct
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    // If there is no token in localStorage, redirect to the login page
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectRoute;