import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user data from localStorage and update login state
    localStorage.removeItem('loggedInUser');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <button
      className="font-poppins font-normal cursor-pointer text-[16px] text-dimWhite"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
