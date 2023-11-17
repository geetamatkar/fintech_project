import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { close, menu } from "../assets";
import { navLinks } from "../constants";
import Logout from "./Logout"; // Import the Logout component

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in using localStorage
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear the loggedInUser from localStorage and update isLoggedIn state
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to the login page after logout
  };

  const handleNavLinkClick = (title) => {
    setActive(title);
    if (title === "Home") {
      navigate("/");
    } else if (title === "Login") {
      navigate("/login");
    } else if (title === "Services") {
      navigate("/services");
    } else if(title === "Contact") {
      navigate("/contact");
    } else {
      // Handle other navigation logic if needed
      // For example: navigate(`/${title.toLowerCase()}`)
    }
  };

  return (
      <nav className="w-full flex py-6 justify-between items-center navbar">
        {/* Your logo or site name */}
        <a href="/" className="text-gradient text-[34px]">
          Quantum Vault
        </a>{" "}
        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          {navLinks.map((nav, index) => {
            if (nav.title === "Login" && isLoggedIn) {
              return null; // Hide "Login" link if logged in
            } else if (nav.title === "Logout" && !isLoggedIn) {
              return null; // Hide "Logout" link if not logged in
            }
            return (
              <li
                key={nav.id}
                className={`font-poppins font-normal cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
                onClick={() => handleNavLinkClick(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            );
          })}
          {isLoggedIn && (
            <li className="font-poppins font-normal cursor-pointer text-[16px] text-dimWhite">
              <Logout handleLogout={handleLogout} />
            </li>
          )}
        </ul>
      {/* Rest of your code for responsive design */}
    </nav>
  );
};

export default Navbar;
