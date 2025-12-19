import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState('user'); // New state for role selection

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    };

    // Branch endpoint based on selected role
    const endpoint = role === 'captain' 
      ? `${import.meta.env.VITE_API_URL}/api/captains/login` 
      : `${import.meta.env.VITE_API_URL}/api/users/login`;

    try {
      const response = await axios.post(endpoint, userData);
      
      if (response.status === 200) {
        const data = response.data;
        // The backend returns { _id, name, email, token } directly
        localStorage.setItem('token', data.token); 
        setUser(data); 
        navigate('/home');
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Invalid credentials");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#f7f5f0] text-slate-900">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-3xl font-semibold text-center mb-2">Welcome Back</h2>
        <p className="text-center text-slate-500 text-sm mb-8">Login to continue your ride</p>

        {/* Role Selector */}
        <div className="flex bg-slate-100 rounded-full p-1 mb-8">
          <button
            type="button"
            onClick={() => setRole('user')}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              role === 'user' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'
            }`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setRole('captain')}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              role === 'captain' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'
            }`}
          >
            Captain
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#f8c020] bg-slate-50"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#f8c020] bg-slate-50"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#f8c020] font-semibold text-lg text-slate-900 shadow-md active:scale-95 transition"
          >
            Login as {role === 'user' ? 'User' : 'Captain'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Don't have an account? <Link to="/signup" className="font-semibold text-slate-900 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;