import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="p-4">
      <nav className="flex justify-between items-center bg-white p-4 shadow-md rounded-xl">
        <h1 className="text-xl font-bold">Uber</h1>
        
        {/* Logout Link */}
        <Link 
          to="/logout" 
          className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
        >
          Logout
        </Link>
      </nav>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Welcome to your dashboard!</h2>
        {/* Your other Home content */}
      </div>
    </div>
  );
};

export default Home;