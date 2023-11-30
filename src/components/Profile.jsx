/*import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Use Axios for making API requests

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Fetch user details from the database
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8008/api/get-user-details'); // Replace with appropriate endpoint
        const { firstName, lastName, username } = response.data;

        setUserData({
          firstName,
          lastName,
          fullName: `${firstName} ${lastName}`,
        });

        setIsAdmin(username === 'admin');
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {userData.fullName}</h2>

      {!isAdmin && (
        <div className="flex justify-between flex-wrap mt-4 ">
          <Link to="/credit-card-application" className="tile text-white">
            Credit Card Application
          </Link>
          <Link to="/loan-application" className="tile text-white">
            Loan Application
          </Link>
          <Link to="/crypto-application" className="tile text-white">
            Cryptocurrency Application
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
*/

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    username: '',
  });

  /*useEffect(() => {
    // Fetch user details from your database based on the logged-in user's credentials
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser !== 'admin') {
      // Assuming you have an endpoint to fetch user details based on the username
      fetchUserDetails(loggedInUser);
    }
  }, []);

  const fetchUserDetails = async (username) => {
    try {
      // Make an API call to fetch user details based on the username
      const response = await fetch(`http://localhost:8008/api/user/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }

      const userData = await response.json();
      setUserDetails({
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
      });
    } catch (error) {
      console.error('Error fetching user details:', error.message);
      // Handle error (e.g., display an error message)
    }
  };
 */

  const [cryptoApplicationsCount, setCryptoApplicationsCount] = useState(0);
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      fetchUserDetails(loggedInUser);
      fetchCryptoApplicationsCount(loggedInUser);
    }
  }, []);
  
  const fetchUserDetails = async (username) => {
    try {
      const response = await fetch(`http://localhost:8008/api/user/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
  
      const userData = await response.json();
      setUserDetails({
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: username, // You might want to set the username in state as well
      });
    } catch (error) {
      console.error('Error fetching user details:', error.message);
      // Handle error
    }
  };

  const fetchCryptoApplicationsCount = async (username) => {
    try {
      const response = await fetch(`http://localhost:8008/api/user-crypto-applications/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch crypto applications count');
      }
  
      const data = await response.json();
      setCryptoApplicationsCount(data.cryptoApplicationsCount);
    } catch (error) {
      console.error('Error fetching crypto applications count:', error.message);
      // Handle error
    }
  };
  
  return (
    <div className="container mx-auto mt-8 p-8">
      {userDetails.username !== 'admin' ? (
        <div>
        <h1 className="text-2xl mb-4 text-white font-sans"> Hello {`${userDetails.firstName} ${userDetails.lastName}`}!!!</h1>
        <br/>
        <h3 className="text-l mb-4 text-white font-sans"> View your active application: </h3>
        <br/>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center border border-gray-300 p-4">
          <div className="border-b-2 pb-2">
            <Link to="/credit-card-application" className="tile text-white block">
              Credit Card Application
            </Link>

            <br/>

            
          </div>
          <div className="border-b-2 pb-2">
            <Link to="/loan-application" className="tile text-white block">
              Loan Application
            </Link>
          </div>
          <div className="border-b-2 pb-2">
            <Link to="/crypto-application" className="tile text-white block">
              Cryptocurrency Application
            </Link>
            <br/>

            <p className="text-white text-xs">Total Crypto Applications: {cryptoApplicationsCount}</p>
          </div>
        </div>
      </div>
      ) : (
        <h1 className="text-2xl font-bold mb-4">Welcome Admin!</h1>
      )}
    </div>
  );
};

export default Profile;
