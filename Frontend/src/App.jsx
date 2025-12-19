import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Start from './pages/Start.jsx'
import Home from './pages/Home.jsx'
import Logout from './pages/Logout.jsx'
import ProtectRoute from './pages/ProtectRoute.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route
          path='/logout'
          element={
            <ProtectRoute>
              <Logout />
            </ProtectRoute>
          }
        />

        <Route
          path='/home'
          element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
