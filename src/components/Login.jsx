import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in using localStorage
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear the user data from localStorage and update login state
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to login page after logout
  };

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   // const navigate = useNavigate();
    // Validation logic (you can add more specific validation here if needed)
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    // Display login data in the console (for demo purposes)
    console.log('Submitted Data:', { username, password });

    // In a real-world scenario, you would send the data to the server for authentication

    try {
      // Make API call to authenticate user
      const response = await fetch('http://localhost:8008/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      localStorage.setItem('loggedInUser', username);
      setIsLoggedIn(true);

      // Login successful, perform necessary actions (e.g., redirect to dashboard)


      resetForm();
      alert('Login successful!');
      window.location.href = '/';
      //navigate("/");
      
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
<<<<<<< HEAD
    
       
    <div className="max-w-lg mx-auto mt-8 p-8 border rounded shadow-md">
=======
    <div class="flex-col min-h-fit flex justify-center">
    <div className="max-w-xl mx-auto mt-16 p-16 border rounded shadow-md w-full">
>>>>>>> upstream/main
      <h2 className="text-2xl text-white font-bold mb-4">Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="username" className="text-sm font-medium text-gray-600">
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium text-gray-600">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Login
        </button>

        <p className="text-gray-600 text-sm">
          New user?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
<<<<<<< HEAD
      

    
=======
  </div>
>>>>>>> upstream/main
  );
};

export default Login;
