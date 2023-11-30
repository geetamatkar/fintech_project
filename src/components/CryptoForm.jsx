import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CryptoForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
    accountNumber: '',
    submitted: false,
  });

  // Fetch the logged-in user's username from localStorage
  const loggedInUser = localStorage.getItem('loggedInUser');

  useEffect(() => {
    // Pre-populate the username if the user is logged in
    if (loggedInUser) {
      setFormData((prevData) => ({
        ...prevData,
        username: loggedInUser,
      }));
    }
  }, [loggedInUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.accountNumber.length !== 8) {
      alert('Please enter a valid 8-digit account number.');
      return;
    }

    try {
      // Make API call to submit crypto form data
      const response = await fetch('http://localhost:8008/api/crypto-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {

        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      alert("Your investment is successfull")
      navigate('/services');
      

      setFormData({
        ...formData,
        submitted: true,
      });
    } catch (error) {
      console.error('Error submitting crypto form:', error.message);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-8 border rounded shadow-md">
      <h2 className="text-2xl text-white font-bold mb-4">Crypto Investment Form</h2>

      {formData.submitted ? (
        <div>
          <h3 className="text-lg font-semibold">Application Submitted</h3>
          {/* Additional details or redirection */}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {loggedInUser && (
            <div className="flex flex-col">
              <label htmlFor="username" className="text-sm font-medium text-gray-600">
                Username:
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                value={loggedInUser}
                readOnly
              />
            </div>
          )}

          <div className="flex flex-col">
            <label htmlFor="amount" className="text-sm font-medium text-gray-600">
              Investment Amount:
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              value={formData.amount}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="accountNumber" className="text-sm font-medium text-gray-600">
              Account Number:
            </label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              value={formData.accountNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default CryptoForm;
