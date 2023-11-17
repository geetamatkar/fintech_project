import React from "react";

const Logout = ({ handleLogout }) => {
  const handleLogoutClick = () => {
    handleLogout(); // Call the handleLogout function passed from Navbar
  };

  return (
    <button onClick={handleLogoutClick}>Logout</button>
  );
};

export default Logout;
