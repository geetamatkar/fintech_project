import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from the server based on the logged-in user
    const loggedInUser = localStorage.getItem('loggedInUser');

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8008/api/user/${loggedInUser}`);
        if (!response.ok) {
          throw new Error('Error fetching user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (loggedInUser && loggedInUser !== 'admin') {
      fetchUserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  const { firstName, lastName } = userData;
  const fullName = `${firstName} ${lastName}`;

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Welcome, {fullName}</h2>
          {localStorage.getItem('loggedInUser') !== 'admin' && (
            <div>
              <h3>Available Applications</h3>
              <div className="tiles">
                <div className="tile">Credit Card Application</div>
                <div className="tile">Loan Application</div>
                <div className="tile">Cryptocurrency Application</div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
