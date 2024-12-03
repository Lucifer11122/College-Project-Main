import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import p23 from '../assets/p23.png';

const UserProfile = () => {
  const navigate = useNavigate();
  const [isFirstTimeLogin, setIsFirstTimeLogin] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleFirstLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/setup-password', {
        username: loginData.username,
        password: loginData.password
      });

      // Reset first-time login state and proceed to login
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.role);
      
      setIsFirstTimeLogin(false);
      setLoginData({ username: loginData.username, password: '' });
      
      // Navigate based on role
      navigateToDashboard(response.data.role);
    } catch (error) {
      setError(error.response?.data?.message || 'Password setup failed');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
      const { isNewUser, role, token } = response.data;

      // Store authentication details
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);

      if (isNewUser) {
        setIsFirstTimeLogin(true);
      } else {
        navigateToDashboard(role);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      console.error('Login error:', error);
    }
  };

  const navigateToDashboard = (role) => {
    switch(role) {
      case 'student':
        navigate('/student-dashboard');
        break;
      case 'teacher':
        navigate('/teacher-dashboard');
        break;
      default:
        navigate('/user-profile');
    }
  };

  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/a56.gif')",
      }}
    >
      <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <img src={p23} width="120" alt="Logo" />
            <h1 className="mb-2 text-2xl font-semibold">
              {isFirstTimeLogin 
                ? 'Set Up Your Password' 
                : 'Student/Teacher Portal'}
            </h1>
          </div>
          
          {error && (
            <div className="mb-4 text-red-500 text-center">
              {error}
            </div>
          )}

          {isFirstTimeLogin ? (
            <form onSubmit={handleFirstLoginSubmit}>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-orange-600 bg-opacity-100 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  value={loginData.username}
                  disabled
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-neon bg-opacity-100 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="password"
                  placeholder="Set New Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({
                    ...loginData, 
                    password: e.target.value
                  })}
                  required
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl bg-neon bg-opacity-100 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                >
                  Set Password
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-orange-600 bg-opacity-100 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={loginData.username}
                  onChange={(e) => setLoginData({
                    ...loginData, 
                    username: e.target.value
                  })}
                  required
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-neon bg-opacity-100 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({
                    ...loginData, 
                    password: e.target.value
                  })}
                  required
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl bg-neon bg-opacity-100 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                >
                  Login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;