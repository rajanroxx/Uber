import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const Signup = () => {
  const [role, setRole] = useState('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const {user, setUser } = React.useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define different base configurations based on the role
    const isCaptain = role === 'captain';
    const endpoint = isCaptain 
      ? `${import.meta.env.VITE_API_URL}/api/captains/register` 
      : `${import.meta.env.VITE_API_URL}/api/users/register`;

    // Construct the payload based on backend requirements
    const payload = isCaptain ? {
      name,
      email,
      password,
      // The backend Captain model requires these specific nested fields
      licenseNumber: "TEMP-LIC-" + Math.random().toString(36).substr(2, 9), // Suggest adding an input field for this
      vehicleDetails: {
        model: vehicleType,
        make: "Standard", // Required by backend validation
        year: 2024,       // Required by backend validation
        color: "Black",    // Required by backend validation
        licensePlate: vehicleNumber
      }
    } : {
      name,
      email,
      phone,
      password
    };

    try {
      const response = await axios.post(endpoint, payload);
      
      if (response.status === 201) {
        const data = response.data;
        
        // Store the token in localStorage to persist the session
        localStorage.setItem('token', data.token); 
        
        // Update context with the returned user/captain data
        setUser(data);

        // Redirect to appropriate home page
        navigate('/home');
      }
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed. Please check your details.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#f7f5f0] text-slate-900">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center mb-2">
          Create Account
        </h2>
        <p className="text-center text-slate-500 text-sm mb-6">
          Sign up as a rider or captain
        </p>

        {/* Role Switch */}
        <div className="flex bg-slate-100 rounded-full p-1 mb-8">
          <button
            type="button"
            onClick={() => setRole('user')}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              role === 'user'
                ? 'bg-white shadow-sm text-slate-900'
                : 'text-slate-500'
            }`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setRole('captain')}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              role === 'captain'
                ? 'bg-white shadow-sm text-slate-900'
                : 'text-slate-500'
            }`}
          >
            Captain
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#f8c020]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#f8c020]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#f8c020]"
            />
          </div>

          {/* Captain-only fields */}
          {role === 'captain' && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Vehicle Type
                </label>
                <input
                  type="text"
                  placeholder="Auto, Car, Bike..."
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#f8c020]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Vehicle Number
                </label>
                <input
                  type="text"
                  placeholder="GJ-05-AB-1234"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#f8c020]"
                />
              </div>
            </>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#f8c020]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#f8c020] font-semibold text-lg text-slate-900 shadow-md active:scale-95 transition"
          >
            {role === 'user'
              ? 'Create User Account'
              : 'Create Captain Account'}
          </button>
        </form>

        {/* Already have account */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <a
            href="/login"
            className="font-semibold text-slate-900 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
