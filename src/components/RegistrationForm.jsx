// Import React and useState hook
import React, { useState } from 'react';

// Functional component for the registration form
const RegistrationForm = () => {
  // State variables to store form data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState(''); // Added state for date of birth
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState(''); // Added state for re-entering password
  const [error, setError] = useState('');

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setDob('');
    setEmail('');
    setUsername('');
    setPassword('');
    setRePassword('');
    setError('');
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Password validation
    if (password !== rePassword) {
      setError('Passwords do not match!');
      return;
    }

    // Display form data in the console (for demo purposes)
    console.log('Submitted Data:', { firstName, lastName, dob, email, username, password, rePassword });

    // In a real-world scenario, you would send the data to the server for processing and storage


    try {
      // Make API call to register user
      const response = await fetch('http://localhost:8008/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, dob, email, username, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      // Registration successful, redirect to the login page

     // window.location.href = '/Login';
     resetForm();
     alert('Registration successful!');
     window.location.href = '/login';
    } catch (error) {
      console.error('Error registering user:', error.message);
      setError('Error registering user. Please try again.');
    }
  };

  


  return (
    <div className="max-w-lg mx-auto mt-8 p-8 border rounded shadow-md">
      <h2 className="text-2xl text-white font-bold mb-4">Customer Registration</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-sm font-medium text-gray-600">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="lastName" className="text-sm font-medium text-gray-600">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="dob" className="text-sm font-medium text-gray-600">
            Date of Birth:
          </label>
          <input
            type="date"
            id="dob"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

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

        <div className="flex flex-col">
          <label htmlFor="rePassword" className="text-sm font-medium text-gray-600">
            Re-Enter Password:
          </label>
          <input
            type="password"
            id="rePassword"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;