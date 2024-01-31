// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      const { accessToken } = response.data;
      setToken(accessToken);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="bg-white p-8 rounded shadow-md" onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

// src/App.js
// ... (previous code)

const AdminPanel = ({ token }) => {
  return (
    <div className="text-center bg-white p-8 mt-4 rounded shadow-md">
      <h2 className="text-3xl font-bold mb-4">Admin Panel</h2>
      <p className="text-gray-700">This is the protected content.</p>
    </div>
  );
};

const Home = () => {
  return (
    <div className="text-center bg-white p-8 mt-4 rounded shadow-md">
      <h2 className="text-3xl">Home</h2>
      <p className="text-gray-700">This is the home page content.</p>
    </div>
  );
};

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <div className="bg-gray-200 min-h-screen">
        <nav className="bg-blue-500 p-4">
          <ul className="flex">
            <li className="mr-6">
              <Link className="text-white" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="text-white" to="/admin">
                Admin Panel
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <Navigate to="/admin" />
              ) : (
                <LoginForm setToken={setToken} />
              )
            }
          />
          <Route
            path="/admin"
            element={token ? <AdminPanel token={token} /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
